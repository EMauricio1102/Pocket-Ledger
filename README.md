# Pocket Ledger: desktop app

This folder turns the Pocket Ledger web page (`index.html`) into a normal desktop program
for Windows, macOS and Linux using Electron. Everything runs locally. There is no server,
no account, and no network use. Each person who installs it gets their own empty ledger.

## Build it on your own computer

1. Install Node.js (version 18 or newer) from https://nodejs.org
2. Open a terminal in this folder and run:

       npm install
       npm start          (opens the app so you can try it)
       npm run dist       (builds an installer for the system you are on)

The finished files appear in the `dist` folder:

| Built on | You get |
|---|---|
| Windows | `Pocket Ledger Setup.exe` (installer) and a portable `.exe` |
| macOS | `Pocket Ledger.dmg` |
| Linux | `Pocket Ledger.AppImage` |

A Windows installer must be built on Windows, and a Mac one on a Mac.

## Build all three at once (free, no extra machines)

1. Put this folder in a new GitHub repository.
2. Open the repository's **Actions** tab, choose **Build desktop apps**, and click **Run workflow**.
3. When it finishes, download the three installers from the run's **Artifacts** section.

## Sharing it

- Send the installer for each person's system. Nobody needs Node.js to run it.
- The installers are not code-signed, so Windows may show "Windows protected your PC"
  (click More info, then Run anyway) and macOS may say the app can't be opened
  (right-click the app, choose Open, then confirm). Signing removes these warnings but needs
  paid developer certificates.
- Your own data is never inside the installer. It is stored separately on each computer, so
  you can share the file freely. Do not send your exported backup files to other people.

## Where each person's data lives

- Windows: `%APPDATA%\Pocket Ledger`
- macOS: `~/Library/Application Support/Pocket Ledger`
- Linux: `~/.config/Pocket Ledger`

Use **Export backup** in the app's settings now and then. Uninstalling the app can remove this folder.

## Updating

Replace `index.html` with a newer version of the page, bump `version` in `package.json`,
and build again. People keep their data when they install over the old version.
