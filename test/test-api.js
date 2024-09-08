const request = require('supertest');
var chai = require('chai');
chai.use(require('chai-json-schema'));
const fs = require('fs')

const assert = chai.assert
const expect = chai.expect
const should = chai.should

describe('Testing API for "regres.in"', () => {
const BASE_URL = "https://reqres.in/api/"

    it('Test - GET List User', async () => {

    const response = await request(BASE_URL).get("users?page=2");

    assert.equal(response.statusCode, 200)
    assert.equal(response.body[2])

    expect(response.statusCode).to.equal(200)

    const schemaPath = "resources/jsonSchema/get-list-users-schema.json"
    const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
    assert.jsonSchema(response.body, jsonSchema)
    });

    it('Test - GET Single User', async () => {

    const response = await request(BASE_URL).get("users/2");
    
    assert.equal(response.statusCode, 200)
    assert.equal(response.body[0])

    expect(response.statusCode).to.equal(200)

    const schemaPath = "resources/jsonSchema/get-single-users-schema.json"
    const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
    assert.jsonSchema(response.body, jsonSchema)

    });

    it('Test - POST Create User', async () => {

        const response = await request(BASE_URL)
        .post("users")
        .send(
            {
                "name": "Fina",
                "job": "QA"
            }
        )
    
        console.log(response.body)

        should(response.statusCode === 200)
        const schemaPath = "resources/jsonSchema/post-users-schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)
    });

    it('Test - PUT Update User', async () => {

        const response = await request(BASE_URL)
        .put("users/2")
        .send(
            {
                "name": "Alena",
                "job": "Manager"
            }
        )

        assert.equal(response.statusCode, 200)
        assert.equal(response.body[2])

        const schemaPath = "resources/jsonSchema/put-users-schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)
    });

    it('Test - DELETE Update User', async () => {

        const response = await request(BASE_URL)
        .delete("users/2")
    
        console.log(response.body)
        assert.equal(response.statusCode, 204)
    });

});