import React from 'react'
import { Observable } from 'rxjs'

interface ExtendedStorageChange<T> extends chrome.storage.StorageChange {
  key: keyof T
  newValue: T[keyof T]
  oldValue: T[keyof T]
}

class ExtendedStorage<T extends Record<string, any>> {
  constructor(private area: chrome.storage.AreaName) {}

  get(key: keyof T): Observable<T[keyof T]> {
    return new Observable(observer => {
      chrome.storage[this.area].get([key], items => {
        observer.next((items as unknown as T)[key])
        observer.complete()
      })
    })
  }

  set(key: keyof T, value: T[keyof T]): Observable<void> {
    const items = { [key]: value } as Record<keyof T, T[keyof T]>
    return new Observable(observer => {
      chrome.storage[this.area].set(items, () => {
        observer.next()
        observer.complete()
      })
    })
  }

  remove(key: keyof T): Observable<void> {
    return new Observable(observer => {
      chrome.storage[this.area].remove(key as string, () => {
        observer.next()
        observer.complete()
      })
    })
  }

  clear(): Observable<void> {
    return new Observable(observer => {
      chrome.storage[this.area].clear(() => {
        observer.next()
        observer.complete()
      })
    })
  }

  changes<C extends Record<string, any>>(): Observable<ExtendedStorageChange<C>> {
    return new Observable(observer => {
      chrome.storage.onChanged.addListener((changes, areaName) => {
        if (areaName === this.area) {
          Object.entries(changes).forEach(([key, change]) => {
            observer.next({
              key,
              newValue: change.newValue,
              oldValue: change.oldValue
            })
          })
        }
      })
    })
  }
}

interface Store {
  foo: string
  bar: number
  baz: boolean
}

export const storage = new ExtendedStorage<Store>('sync')

const useStorage = <K extends keyof Store>(key: K) => {
  const [value, setState] = React.useState<Store[K] | undefined>()

  React.useEffect(() => {
    const subscription = storage.get(key).subscribe(val => setState(val as Store[K] | undefined))
    return () => subscription.unsubscribe()
  }, [key])

  React.useEffect(() => {
    const subscription = storage.changes<Store>().subscribe(change => {
      if (change.key === key) setState(change.newValue as unknown as Store[K])
    })
    return () => subscription.unsubscribe()
  }, [])

  const set = (value: Store[K]) => storage.set(key, value).subscribe()

  return { value, set } as const
}

export default useStorage
