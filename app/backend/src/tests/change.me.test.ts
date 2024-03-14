import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeUsers from '../database/models/SequelizeUsers';
import SequelizeMatches from '../database/models/SequelizeMatches';
import JWT from '../utils/JWT';
import Validations from '../middlewares/Validations';
import teamsMocks from './mocks/teams-mocks';
import user from './mocks/login-mocks';
import matche from './mocks/matches-mocks';
import leaderboardMocks from './mocks/leaderboard-mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  describe('Teams tests', () => {
    it('Should return all teams', async function () {
      const teams = teamsMocks.teams;
      sinon.stub(SequelizeTeams, 'findAll').resolves(teams as any);
      const { status, body } = await chai.request(app).get('/teams');
      expect(status).to.be.eq(200);
      expect(body).to.be.deep.eq(teams);
    })

    it('Should return a team by id', async function () {
      const team = teamsMocks.oneTeam;
      sinon.stub(SequelizeTeams, 'findByPk').resolves(team as any);
      const { status, body } = await chai.request(app).get('/teams/1');
      expect(status).to.be.eq(200);
      expect(body).to.be.deep.eq(team);
    })

    it('Should return 404 when team not found', async function () {
      sinon.stub(SequelizeTeams, 'findByPk').resolves(null);
      const { status, body } = await chai.request(app).get('/teams/1');
      expect(status).to.be.eq(404);
      expect(body).to.be.deep.eq({ message: 'The 1 not found' });
    })
  });

  describe('Login tests', function () {
    const validUser = user.validUser;
    const wrongPassword = user.wrongPassword;
    const token = user.token;
    const userMock = user.user;
    const wrongEmail = user.wrongEmail;

    it('Should return token when login is successful', async function () {
      sinon.stub(SequelizeUsers, 'findOne').resolves(userMock as any);
      sinon.stub(JWT, 'sign').returns(token);
      sinon.stub(Validations, 'validationLogin').resolves();

      const { status, body } = await chai.request(app).post('/login').send(validUser);
      expect(status).to.be.eq(200);
      expect(body).to.be.deep.eq({ token });
    });

    it('Should return 400 when email or password is not provided', async function () {
      const { status, body } = await chai.request(app).post('/login').send({});
      expect(status).to.be.eq(400);
      expect(body).to.be.deep.eq({ message: 'All fields must be filled' });
    });

    it('Should return 400 when email is invalid', async function () {
      sinon.stub(SequelizeUsers, 'findOne').resolves(validUser as any);
      sinon.stub(JWT, 'sign').returns(token);
      sinon.stub(Validations, 'validationLogin').resolves();
      const { status, body } = await chai.request(app).post('/login').send(wrongEmail);
      expect(status).to.be.eq(401);
      expect(body).to.be.deep.eq({ message: 'Invalid email or password' });
    });

    it('Should return 401 when password is invalid', async function () {
      sinon.stub(SequelizeUsers, 'findOne').resolves(validUser as any);
      sinon.stub(JWT, 'sign').returns(token);
      sinon.stub(Validations, 'validationLogin').resolves();

      const { status, body } = await chai.request(app).post('/login').send(wrongPassword);
      expect(status).to.be.eq(401);
      expect(body).to.be.deep.eq({ message: 'Invalid email or password' });
    });

    it('Should return 400 when not found email', async function () {
      const semChaveEmail = { password: 'xxxxxx' }
      const { status, body } = await chai.request(app).post('/login').send(semChaveEmail);
      expect(status).to.be.eq(400);
      expect(body).to.be.deep.eq({ message: 'All fields must be filled' });
    })

    it('Should return 400 when not found email', async function () {
      const semChavePassword = { email: 'xxxxxx' }
      const { status, body } = await chai.request(app).post('/login').send(semChavePassword);
      expect(status).to.be.eq(400);
      expect(body).to.be.deep.eq({ message: 'All fields must be filled' });
    })

    it('Should return 401 when password < 6', async function () {
      const semChavePassword = {
        email: 'lari@dev.com',
        password: 'secr'
      }
      sinon.stub(SequelizeUsers, 'findOne').resolves(semChavePassword as any);
      sinon.stub(Validations, 'validationLogin').resolves();
      const { status, body } = await chai.request(app).post('/login').send(semChavePassword);
      expect(status).to.be.eq(401);
      expect(body).to.be.deep.eq({ message: 'Invalid email or password' });
    });
  });

  describe('Matches tests', function () {
    const matches = matche.matches;

    it('Should return all matches', async function () {
      sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);
      const { status, body } = await chai.request(app).get('/matches');
      expect(status).to.be.eq(200);
      expect(body).to.be.deep.eq(matches);
    });

    it('Should return all matches in progress true', async function () {
      sinon.stub(SequelizeMatches, 'findAll').resolves([matches[1]] as any);

      const { status, body } = await chai.request(app).get('/matches?inProgress=true');

      expect(status).to.be.eq(200);
      expect(body).to.be.deep.eq([matches[1]]);
    });

    it('Should return all matches in progress false', async function () {
      sinon.stub(SequelizeMatches, 'findAll').resolves([matches[0]] as any);

      const { status, body } = await chai.request(app).get('/matches?inProgress=false');

      expect(status).to.be.eq(200);
      expect(body).to.be.deep.eq([matches[0]]);
    });

    it('Shouls return Finished when update match in progress', async function () {
      sinon.stub(SequelizeMatches, 'findByPk').resolves(matches as any);
      sinon.stub(SequelizeMatches, 'update').resolves([1] as any);
      sinon.stub(JWT, 'verify').resolves();

      const { status, body } = await chai.request(app).patch('/matches/2/finish').set('authorization', 'Bearer token');

      expect(status).to.be.eq(200);
      expect(body).to.be.deep.eq({ message: 'Finished' });
    });

    it('Should return 404 when match not found', async function () {
      sinon.stub(SequelizeMatches, 'findByPk').resolves(null);
      sinon.stub(JWT, 'verify').resolves();

      const { status, body } = await chai.request(app).patch('/matches/3/finish').set('authorization', 'Bearer token');

      expect(status).to.be.eq(404);
      expect(body).to.be.deep.eq({ message: 'The id 3, not found' });
    });

    it('Should apdate match return Updated match', async function () {
      sinon.stub(SequelizeMatches, 'findByPk').resolves(matches[1] as any);
      sinon.stub(SequelizeMatches, 'update').resolves([1] as any);
      sinon.stub(JWT, 'verify').resolves();

      const { status, body } = await chai.request(app).patch('/matches/2')
        .send(matche.updatedMatch)
        .set('authorization', 'Bearer token');

      expect(status).to.be.eq(200);
      expect(body).to.be.deep.eq({ message: 'Updated match' });
    });

    it('Should return 404 when match not update', async function () {
      sinon.stub(SequelizeMatches, 'findByPk').resolves(matches[0] as any);
      sinon.stub(SequelizeMatches, 'update').resolves([1] as any);
      sinon.stub(JWT, 'verify').resolves();

      const { status, body } = await chai.request(app).patch('/matches/1').send(matche.updatedMatch).set('authorization', 'Bearer token');

      expect(status).to.be.eq(404);
      expect(body).to.be.deep.eq({ message: 'Error when updating' });
    });

    it('Should create match when all data is correct', async function () {
      sinon.stub(SequelizeMatches, 'create').resolves(matche.retornCreateMatch as any);
      sinon.stub(JWT, 'verify').resolves();

      const { status, body } = await chai.request(app).post('/matches')
        .send(matche.createdMatch)
        .set('authorization', 'Bearer token');

      expect(status).to.be.eq(201);
      expect(body).to.be.deep.eq(matche.retornCreateMatch);
    });

    it('Shound return 404 when homeTeamId is equal awayTeamId', async function () {
      sinon.stub(JWT, 'verify').resolves();

      const { status, body } = await chai.request(app).post('/matches')
        .send(matche.createdWrongMatch)
        .set('authorization', 'Bearer token');

      expect(status).to.be.eq(422);
      expect(body).to.be.deep.eq({ message: 'It is not possible to create a match with two equal teams' });
    });

    it('Should return error when not data correct', async function () {
      sinon.stub(JWT, 'verify').resolves();

      const { status, body } = await chai.request(app).post('/matches')
        .send(matche.createdDataWorng)
        .set('authorization', 'Bearer token');

      expect(status).to.be.eq(404);
      expect(body).to.be.deep.eq({ message: 'There is no team with such id!' });
    });
  });

  describe('Leaderboard tests', function () {
   it('Should return all teams performance', async function () {
    sinon.stub(SequelizeTeams, 'findAll').resolves(teamsMocks.teams as any);
    sinon.stub(SequelizeMatches, 'findAll').resolves(leaderboardMocks.matches as any);

    const { status, body } = await chai.request(app).get('/leaderboard');

    expect(status).to.be.eq(200);
    expect(Array.isArray(body)).to.be.true;
    expect(body.length).to.be.eq(4);
   });
  });

  afterEach(sinon.restore);
});
