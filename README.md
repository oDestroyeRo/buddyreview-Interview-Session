# buddyreview-Interview-Session

## Description

Backend API for Note Talking

### Framwork
* NestJS

### Database
* MongoDB

## domo live in
http://34.126.119.209/notes



## Require

* docker
* docker-compose

## Installation

```bash
$ docker build -t nestjs-backend-image .
$ docker-compose up -d
```

## Access
http://localhost/notes


## API Desscription

* Get all notes
    * http://localhost/notes

* Get all notes with sort field _id
    * http://localhost/notes?sort=asc&sortField=_id
        * sort: [asc,desc]
        * sortField: [_id,title,content,createAt,updateAt,tags]

* Get all notes with sort field _id and specify tag
    * http://localhost/notes?sort=asc&sortField=_id&tags=meeting

* Get all notes with sort field _id and specify more than 1 tag
    * http://localhost/notes?sort=asc&sortField=_id&tags=meeting&tags=interview

* Get all notes with id
    * http://localhost/notes/{id} 

* Add note (Post)
    * http://localhost/notes
        * title: String
        * content: String
        * tags: [String]

* Update note (PATCH)
    * http://localhost/notes/{id}
        * title: String
        * content: String
        * tags: [String]

* Delete note (DELETE)
    * http://localhost/notes/{id}


