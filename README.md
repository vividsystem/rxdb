# rx-db

## Roadmap

## to mvp
### programming 
#### major 
- [x] Create Login Page 
    -> BetterAuth
    - [x] magic links
- [ ] remaking solid-start actions api into REST api 
    - [x] member
        - [x] zod validation
    - [x] banking
        - [x] zod validation 
- [x] revamping route structure
    - one single route for the table w/ edits, additions etc.
    - implement `@kobalt/core` instead of relying on own popups 

- [ ] zod for env
- [ ] add logging  -> winston or pino
- [ ] add rate limiting, csrf, etc.
- [ ] export feature: export (partial) table -> select certain columns -> emails etc.
- [ ] make design responsive/mobile support
- [ ] role-based auth

#### minor
- [ ] feat: deny signup __before__ sending email
- [ ] add BIC auto generation
- [ ] add format validation for IBAN, BIC, year of exchange and phone number
- [ ] add local store to member table for "hot reload" -> remove verified members from table on edit

### deployment
- [ ] make Dockerfile for app
- [ ] postgres with tde
- [ ] hashicorp vault for storing encryption keys and certs? 


## to more features: 
- [ ] events -> event colaboration
    - online sign-up for attendees
    - calendar exportation
- todos and kanban?

## to lunatic level features:
- rxchat
- rxvideo
