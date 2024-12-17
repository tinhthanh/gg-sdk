clasp login
// create sheet
npx clasp create --type sheets --title "14-solpet2025" --rootDir ./dist
// copy sheet created

clasp login --status
clasp logout
clasp create title VETGO
--> copy
Created new Google Sheet: https://drive.google.com/open?id=1TTObHO5b8EwPm6w0c-CyQ06AwlUaxkV-Mw_BIfTAwP0
Created new Google Sheets Add-on script: https://script.google.com/d/1ZeMqAnvK4Nbj6H1AJashMRaeBWPWKELsf-W9qkyL8HpWUW2qPlByjhQz/edit
copyfiles -f ./client/main/.* ./ && npm run build && npx clasp push && npx clasp deploy
clasp push
clasp pull
// get list deployment
npx clasp deployments
2 Deployments.
- AKfycbypVl_83QzPL9stzx74Sskcr94HLZ6T2MTr5jYWD6A @HEAD
- AKfycbyzNxU086vtCxpWWw75jVGGIDkhfni-TSru5jORe3a_h4G6rPJRyWSGs3JeuLDxX_P3 @1 - VETGO

-> id
// redeploy
npx clasp deploy -i AKfycbyzNxU086vtCxpWWw75jVGGIDkhfni-TSru5jORe3a_h4G6rPJRyWSGs3JeuLDxX_P3



