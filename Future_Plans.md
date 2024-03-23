## Notes
```
Model/Votes - {
    _id,
    user_id,
    entity_id,
    ENUM type(upvote, downvote),
    ENUM entity_type(post, comment),
}

```


<!-- ## First things to do -->


## Todo

1. Add a additional API for changing the password(and remove from update user)
2. Add a API to get all posts of a tag (optimize it)
3. Plan for Votes

## What is done

Authentication Sytem
    - Login system
dsds
User
    - CRUD
    - Profile (gives posts too)

Posts
    - CRUD

Comments
    -Create Update Delete

Tags 
    - Get All Tags
    - Get All Posts of a Tag
    - Insert bulk tags in database

Votes
    - Added API to Add Update Delete Votes(all in one API)
    - Added API to View Vote Count of any entityId

