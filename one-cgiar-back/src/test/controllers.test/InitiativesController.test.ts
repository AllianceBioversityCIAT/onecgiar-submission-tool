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
var budgetId;

/**Create user and token for test */
before(async () => {
    const initiativeId = 2;
    const stageId = 3;

    //Get user test
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

    //Get token test
    token = await jwt.createToken(user);

    //Get budget test
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

            budgetId = res.body.response.getBudget.id;

        });

});


after(async () => {

    //Remove user test
    await chai
        .request(app)
        .delete('/api/users/remove/' + user.id)
        .set('auth', token)
        .then((res) => {
            console.log('User ' + user.id + ' was removed.');
        });

    //Remove Budget test
    await chai
        .request(app)
        .delete('/api/initiatives/delete-budget/' + budgetId)
        .set('auth', token)
        .then((res) => {

            console.log(res.body.title);

        });


})

/**Start test */
describe('Initiatives Controller', async () => {

    const initiativeId = 2;
    const stageId = 3;

    /**INITIATIVES*/

    it('GET initiatives/ Request all Initiatives', async () => {

        await chai
            .request(app)
            .get('/api/initiatives/')
            .set('auth', token)
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('response').to.be.a('object');
                expect(res.body).to.have.property('title').to.be.equal('All Initiatives.');
                expect(res).to.be.a('object')
            });

    });


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
                "value": 1234.25,
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
                "value": 123.15,
                "table_name": "general_information",
                "col_name": "budget",
                "budgetId": 64,
                "active": 1
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
