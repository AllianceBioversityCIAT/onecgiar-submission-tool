import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import jwt from '../helpers/jwt-auth';


chai.use(chaiHttp);

const app = 'http://localhost:3000';
var token: any = '';
var user = {
    id: '',
    email: ''
};

/**Create user and token for test */
before(async () => {
    await chai
        .request(app)
        .post('/api/users/')
        .type('form')
        .send({
            "first_name": "test",
            "last_name": "test",
            "password": 'Test12345',
            "is_cgiar": false,
            "email": "test@hotmail.com",
            "roles": [1]
        })
        .then((res) => {
            user.id = res.body.response.user.id;
            user.email = res.body.response.user.email;
        });
    token = await jwt.createToken(user);
});

/**Delete user test */
after(async () => {

    await chai
        .request(app)
        .delete('/api/users/remove/' + user.id)
        .set('auth', token)
        .then((res) => {
            console.log('User '+user.id+' was removed.');
        });
})

/**Start test */
describe('Initiatives Controller - links', async () => {

    const initiativeId = 2;
    const stageId = 3;

    /**LINKS*/

    it('POST initiatives/get-link/ Read citations data without token ', async () => {

        await chai
            .request(app)
            .post('/api/initiatives/get-link/' + initiativeId + '/' + stageId)
            .then((res) => {
                expect(res.status).to.equal(400);
            });

    });

    it('POST initiatives/get-link/ Read citations data with token', async () => {

        await chai
            .request(app)
            .post('/api/initiatives/get-link/' + initiativeId + '/' + stageId)
            .set('auth', token)
            .type('form')
            .send({
                'table_name': 'context',
                'col_name': 'priority_setting',
                'active': true
            })
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('response').to.be.a('object');
                expect(res.body).to.have.property('title').to.be.equal('Initiatives:Get link.');
                expect(res).to.be.a('object')
            });

    });

    it('PATCH initiatives/add-link/ Create citations', async () => {

        await chai
            .request(app)
            .patch('/api/initiatives/add-link/' + initiativeId + '/' + stageId)
            .set('auth', token)
            .type('form')
            .send({
                "title": "test7",
                "link": "test7",
                "table_name": "context",
                "col_name": "priority_setting",
                "citationId": null,
                "active": 1
            })
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('response').to.be.a('object');
                expect(res.body).to.have.property('title').to.be.equal('Initiatives:Add link.');
                expect(res).to.be.a('object')
            });

    });

    it('PATCH initiatives/add-link/ Update citations', async () => {

        await chai
            .request(app)
            .patch('/api/initiatives/add-link/' + initiativeId + '/' + stageId)
            .set('auth', token)
            .type('form')
            .send({
                "title": "test5",
                "link": "test5",
                "table_name": "context",
                "col_name": "priority_setting",
                "citationId": 1,
                "active": 1
            })
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('response').to.be.a('object');
                expect(res.body).to.have.property('title').to.be.equal('Initiatives:Add link.');
                expect(res).to.be.a('object')
            });

    });

    it('PATCH initiatives/add-link/ Inactivate citations', async () => {

        await chai
            .request(app)
            .patch('/api/initiatives/add-link/' + initiativeId + '/' + stageId)
            .set('auth', token)
            .type('form')
            .send({
                "title": "test5",
                "link": "test5",
                "table_name": "context",
                "col_name": "priority_setting",
                "citationId": 1,
                "active": 0
            })
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('response').to.be.a('object');
                expect(res.body).to.have.property('title').to.be.equal('Initiatives:Add link.');
                expect(res).to.be.a('object')
            });

    });

    /**BUDGET*/

    it('POST initiatives/get-budget/ Read budget data without token ', async () => {

        await chai
            .request(app)
            .post('/api/initiatives/get-budget/' + initiativeId + '/' + stageId)
            .then((res) => {
                expect(res.status).to.equal(400);
            });

    });

    it('POST initiatives/get-budget/ Read budget data with token', async () => {

        await chai
            .request(app)
            .post('/api/initiatives/get-budget/' + initiativeId + '/' + stageId)
            .set('auth', token)
            .type('form')
            .send({
                'table_name': 'general-information',
                'col_name': 'budget',
                'active': true
            })
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('response').to.be.a('object');
                expect(res.body).to.have.property('title').to.be.equal('Initiatives:Get budget.');
                expect(res).to.be.a('object')
            });

    });

    it('PATCH initiatives/add-budget/ Create Budget', async () => {

        await chai
            .request(app)
            .patch('/api/initiatives/add-budget/' + initiativeId + '/' + stageId)
            .set('auth', token)
            .type('form')
            .send({
                "value": 1234,
                "table_name": "general-information",
                "col_name": "budget",
                "budgetId": null,
                "active": 1
            })
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('response').to.be.a('object');
                expect(res.body).to.have.property('title').to.be.equal('Initiatives:Add Budget.');
                expect(res).to.be.a('object')
            });

    });


    it('PATCH initiatives/add-budget/ Update Budget', async () => {


        await chai
            .request(app)
            .patch('/api/initiatives/add-budget/' + initiativeId + '/' + stageId)
            .set('auth', token)
            .type('form')
            .send({
                "value": 123.12,
                "table_name": "general-information",
                "col_name": "budget",
                "budgetId": 1,
                "active": 1
            })
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('response').to.be.a('object');
                expect(res.body).to.have.property('title').to.be.equal('Initiatives:Add Budget.');
                expect(res).to.be.a('object')
            });

    });

    it('PATCH initiatives/add-budget/ Inactivate budget', async () => {

        await chai
            .request(app)
            .patch('/api/initiatives/add-budget/' + initiativeId + '/' + stageId)
            .set('auth', token)
            .type('form')
            .send({
                "value": 123.12,
                "table_name": "general-information",
                "col_name": "budget",
                "budgetId": 1,
                "active": 0
            })
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('response').to.be.a('object');
                expect(res.body).to.have.property('title').to.be.equal('Initiatives:Add Budget.');
                expect(res).to.be.a('object')
            });

    });

    /**SUMMARY*/

    it('GET initiatives/summary/ Request Initiative summary', async () => {

        await chai
            .request(app)
            .get('/api/initiatives/' + initiativeId + '/summary/' + stageId)
            .set('auth', token)
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('response').to.be.a('object');
                expect(res.body).to.have.property('title').to.be.equal('Initiatives: Summary.');
                expect(res).to.be.a('object')
            });

    });

});
