import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import jwt from '../../helpers/jwt-auth';


chai.use(chaiHttp);


describe('Initiatives Controller - links', async () => {

    const user: any = {
        id: 98,
        email: 'j.cadavid@cgiar.org',
        roles: ['admin', 'customer'],
    };

    const app = 'http://localhost:3000';

    const initiativeId = '2';
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

        const token = await jwt.createToken(user);

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

        const token = await jwt.createToken(user);

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
                "citationId":null,
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

        const token = await jwt.createToken(user);

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
                "citationId":1,
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

        const token = await jwt.createToken(user);

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
                "citationId":1,
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
    
            const token = await jwt.createToken(user);
    
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

            const token = await jwt.createToken(user);
    
            await chai
                .request(app)
                .patch('/api/initiatives/add-budget/' + initiativeId + '/' + stageId)
                .set('auth', token)
                .type('form')
                .send({
                    "value": 1234,
                    "table_name": "general-information",
                    "col_name": "budget",
                    "budgetId":null,
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

            const token = await jwt.createToken(user);
    
            await chai
                .request(app)
                .patch('/api/initiatives/add-budget/' + initiativeId + '/' + stageId)
                .set('auth', token)
                .type('form')
                .send({
                    "value": 123.12,
                    "table_name": "general-information",
                    "col_name": "budget",
                    "budgetId":1,
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

            const token = await jwt.createToken(user);
    
            await chai
                .request(app)
                .patch('/api/initiatives/add-budget/' + initiativeId + '/' + stageId)
                .set('auth', token)
                .type('form')
                .send({
                    "value": 123.12,
                    "table_name": "general-information",
                    "col_name": "budget",
                    "budgetId":1,
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

        const token = await jwt.createToken(user);

        await chai
            .request(app)
            .get('/api/initiatives/' + initiativeId + '/summary/'+ stageId)
            .set('auth', token)
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('response').to.be.a('object');
                expect(res.body).to.have.property('title').to.be.equal('Initiatives: Summary.');
                expect(res).to.be.a('object')
            });

    });

});
