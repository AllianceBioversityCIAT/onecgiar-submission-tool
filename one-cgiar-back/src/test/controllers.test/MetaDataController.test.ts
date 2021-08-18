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

describe('Metadata Controller - Menu', async () => {

    const initiativeId = 2;

    it('GET /meta/menu/  Get Metadata menu without token ', async () => {

        await chai
            .request(app)
            .get('/api/meta/menu/' + initiativeId)
            .then((res) => {
                expect(res.status).to.equal(400);
            });

    });

    it('GET /meta/menu/  Get Metadata menu with token', async () => {

        await chai
            .request(app)
            .get('/api/meta/menu/' + initiativeId)
            .set('auth', token)
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('response').to.be.a('object');
                expect(res.body).to.have.property('title').to.be.equal('MetaData:Menu');
                expect(res).to.be.a('object')
            });

    });

});
