import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import jwt from '../../helpers/jwt-auth';


chai.use(chaiHttp);

const initiativeId = 2;


describe('Metadata Handler', async () => {

    const user: any = {
        id: 98,
        email: 'j.cadavid@cgiar.org',
        roles: ['admin', 'customer'],
    };

    const app = 'http://localhost:3000';


    it('GET /meta/menu/  Get Metadata menu without token ', async () => {

        await chai
            .request(app)
            .get('/api/meta/menu/' + initiativeId)
            .then((res) => {
                expect(res.status).to.equal(400);
            });

    });

    it('GET /meta/menu/  Get Metadata menu with token', async () => {

        const token = await jwt.createToken(user);

        await chai
            .request(app)
            .get('/api/meta/menu/' + initiativeId)
            .set('auth', token)
            .then((res) => {
                expect(res.status).to.equal(200);
            });

    });

});
