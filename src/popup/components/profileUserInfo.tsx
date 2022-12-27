import React from 'react'

const ProfileUserInfo = () => {
  const [account, setAccount] = React.useState<chrome.identity.UserInfo>()

  React.useEffect(() => {
    chrome.identity.getProfileUserInfo({ accountStatus: chrome.identity.AccountStatus.ANY }, userInfo =>
      setAccount(userInfo)
    )
  }, [])

  return (
    <div>
      <h2>{JSON.stringify(account, null, 2)}</h2>
    </div>
  )
}

export default ProfileUserInfo
