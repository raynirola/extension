import React from 'react'
import { Observable } from 'rxjs'

interface ExtendedStorageChange<T> extends chrome.storage.StorageChange {
  key: keyof T
  newValue: T[keyof T]
  oldValue: T[keyof T]
}

export class ExtendedStorage<T extends Record<string, any>> {
  private changes$?: Observable<ExtendedStorageChange<T>>

  constructor(private area: chrome.storage.AreaName) {
    this.changes$ = new Observable(observer => {
      chrome.storage.onChanged.addListener((changes, areaName) => {
        if (areaName === this.area) {
          Object.entries(changes).forEach(([key, change]) => {
            observer.next({ key, newValue: change.newValue, oldValue: change.oldValue })
          })
        }
      })
    })
  }

  get(key: keyof T): Observable<T[keyof T]> {
    return new Observable(observer => {
      chrome.storage[this.area].get([key], items => {
        observer.next((items as unknown as T)[key])
      })

      this.changes$?.subscribe(change => {
        if (change.key === key) observer.next(change.newValue as unknown as T[keyof T])
      })
    })
  }

  set(key: keyof T, value: T[keyof T]): void {
    const items = { [key]: value } as Record<keyof T, T[keyof T]>
    chrome.storage[this.area].set(items)
  }

  remove(key: keyof T): void {
    chrome.storage[this.area].remove(key as string | string[])
  }

  clear(): void {
    chrome.storage[this.area].clear()
  }
}

export interface Store {
  user?: { id: number; name: string; username: string; email: string }
}

export const storage = new ExtendedStorage<Store>('sync')

export const useStorage = <K extends keyof Store>(key: K) => {
  const [value, setState] = React.useState<Store[K]>()

  React.useEffect(() => {
    const subscription = storage.get(key).subscribe(val => setState(val as Store[K]))
    return () => subscription.unsubscribe()
  }, [key])

  const set = (value: Store[K]) => storage.set(key, value)

  const remove = () => storage.remove(key)

  return { value, set, remove } as const
}
