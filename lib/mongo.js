const { MongoClient, ObjectId } = require('mongodb')
const { config } = require('../config')
const { query } = require('express')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`


class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true  })
    this.dbName = DB_NAME
  }
  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(err => {
          if (err) {
            reject(err)
          }
          console.log('connected succesfully to mongo')
          resolve(this.client.db(this.dbName))
        })
      })
    }
    return MongoLib.connection
  }
  getAll(collection, query) {
    return this.connect().then(db => {
      return db.collection(collection).find(query).toArray()
    })
  }
  get(collection, id) {
    id= ObjectId(id)
    return this.connect().then(db => {
      return db.collection(collection).findOne({ _id: id })
    })
  }
  create(collection, data) {
    return this.connect().then(db => {
      return db.collection(collection).insertOne(data)

    }).then(result => result.insertedId)
  }
  update(collection, id, data) {
    id= ObjectId(id)
    return this.connect().then(db => {
      return db.collection(collection).updateOne({ _id: id }, { $set: data }, { upsert: true })

    }).then(result => result.upsertedId || id)
  }
  delete(collection, id) {
    id=ObjectId(id)
    return this.connect().then(db => {
      return db.collection(collection).deleteOne({ _id: id })

    }).then(() => id)
  }
}

module.exports = MongoLib