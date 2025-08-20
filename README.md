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
- [x] change login to login/register site
- [ ] rbac
    - [x] add auth to backend
        - [x] members
        - [x] banking
    - [x] add /member/:id/banking routes
    - [x] add front-end support for new routes
    - [x] delete old banking api routes -> maybe even remove delete banking routes (auto deletes w/ cascade)
    - [ ] add role managment panel to front-end
    - [ ] add auth to front-end protected routes
- [x] fix error handling between api and front-end => custom error type?
- [ ] make callback site for new users -> input member info
- [ ] add logging  -> winston or pino
- [ ] add rate limiting, csrf, etc.
- [ ] export feature: export (partial) table -> select certain columns -> emails etc.
- [ ] make design responsive/mobile support
- [ ] role-based auth
- [ ] add alerts when error occur

#### minor
- [ ] fix bug: user gets 401 when its the first request to a protected route. potential ssr problem?
- [ ] prevent duplicate user creation
- [ ] zod for env
- [ ] feat: deny signup __before__ sending email
- [ ] add BIC auto generation
- [ ] add format validation for IBAN, BIC, year of exchange and phone number
- [ ] add local store to member table for "hot reload" -> remove verified members from table on edit
- [x] change db schema to have a memberId in banking with on delete cascade instead of a banking id in member
- [ ] fix @/schema import bug
- [ ] change email equality check between user and email to memberId in requireUser


### deployment
- [ ] make Dockerfile for app
- [ ] postgres with tde
- [ ] hashicorp vault for storing encryption keys and certs? 


### post-mvp
- [ ] add I18n


## to more features: 
- [ ] events -> event colaboration
    - online sign-up for attendees
    - calendar exportation
- todos and kanban?

## to lunatic level features:
- rxchat
- rxvideo
