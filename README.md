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
    - [ ] make role api routes
    - [x] make member roles and permissions api routes
    - [ ] add role managment panel to front-end
    - [x] add permission routes to back-end -> check permissions
        - [x] rolepermission db wrapper
        - [x] memberrole db wrapper
        - [x] role wrapper
    - [x] only show nav links for things the user is allowed to access
    - [x] add auth to front-end protected routes
- [x] fix error handling between api and front-end => custom error type?
- [ ] make verify and cert routes only accessible by admins -> disable self-verify even for admins?
- [x] make callback site for new users -> input member info
    - [x] input page
    - [x] "thanks for signing up please wait to get verified" page
    - [ ] settings page for users to change their info and view verification status
- [ ] improve seperation of admin permissions and members
    - [ ] clean up different (validation) schemas for user creation
        - [ ] onboarding vs. creation by admin -> new naming UserMember and AdminMember?
        - [ ] editing by member vs admin
        - maybe make seperate Validation and Certification Tables to also save who accepted validation and certification? -> would require soft-delete of members -> maybe change 'certification' in schema to 'police record'
    - [ ] adapt new schema to backend and front-end
- [ ] unify styling
    - [ ] button and input to accept state -> loading, failed, etc.
    - [ ] make meta classes with tailwind
- [ ] add logging  -> winston or pino
- [ ] add rate limiting, csrf, etc.
- [ ] export feature: export (partial) table -> select certain columns -> emails etc.
- [ ] make design responsive/mobile support
- [ ] add search to table -> query params in backend? and input
- [ ] add alerts when error occur


#### minor
- [x] fix bug: user gets 401 when its the first request to a protected route. potential ssr problem?
- [ ] prevent duplicate user creation
- [ ] zod for env
- [ ] feat: deny signup __before__ sending email
- [ ] add BIC auto generation
- [ ] add format validation for IBAN, BIC, year of exchange and phone number
- [ ] add local store to member table for "hot reload" -> remove verified members from table on edit
- [x] change db schema to have a memberId in banking with on delete cascade instead of a banking id in member
- [x] fix @/schema import bug
- [ ] change email equality check between user and email to memberId in requireUser


### deployment
- [ ] make Dockerfile for app -> seed/start config
- [ ] postgres with tde
- [ ] hashicorp vault for storing encryption keys and certs? 
- [ ] email back-end? -> 2 birds 1 stone for email hosting?


### post-mvp
- [ ] add I18n
- [ ] add 2n-eyes -> certain actions have to be checked by n amount of people
- [ ] docusign implementation for direct debit
- [ ] make upload feature for policy records


## to more features: 
- [ ] events -> event colaboration
    - online sign-up for attendees
    - calendar exportation
- todos and kanban?

## to lunatic level features:
- rxchat
- rxvideo
