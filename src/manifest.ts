import { ManifestV3Export } from '@crxjs/vite-plugin'

const manifest: ManifestV3Export = {
  manifest_version: 3,
  version: '1.0.0',
  version_name: 'Shishapangma 1.0.0',
  name: 'Unified Engine',
  description: 'Chrome extension kitchen sink with Manifest V3',
  icons: {
    '16': 'src/assets/icons/16.png',
    '48': 'src/assets/icons/48.png',
    '128': 'src/assets/icons/128.png'
  },
  action: {
    default_popup: 'src/popup/index.html',
    default_icon: 'src/assets/icons/16.png',
    default_title: 'Unified Engine'
  },
  background: {
    service_worker: 'src/service/worker.ts',
    type: 'module'
  },
  permissions: ['identity', 'identity.email', 'storage', 'tabs'],
  host_permissions: ['http://*/*', 'https://*/*'],
  minimum_chrome_version: '96',
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['src/content/index.tsx'],
      run_at: 'document_end'
    }
  ],
  web_accessible_resources: [
    {
      resources: ['src/styles/app.css'],
      matches: ['<all_urls>']
    }
  ]
}

export default manifest
