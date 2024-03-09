import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeUsers from '../database/models/SequelizeUsers';
import JWT from '../utils/JWT';
import Validations from '../middlewares/Validations';
import SequelizeMatches from '../database/models/SequelizeMatches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  describe('Teams tests', () => {
    it('Should return all teams', async function () {
      const teams = [
        { id: 1, teamName: 'team 1' },
        { id: 2, teamName: 'team 2' },
        { id: 3, teamName: 'team 3' },
      ];
      sinon.stub(SequelizeTeams, 'findAll').resolves(teams as any);
      const { status, body } = await chai.request(app).get('/teams');
      expect(status).to.be.eq(200);
      expect(body).to.be.deep.eq(teams);
    })

    it('Should return a team by id', async function () {
      const team = { id: 1, teamName: 'team 1' };
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
    const secrtPassword = '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
    const user = { email: 'lari@dev.com', password: secrtPassword, role: 'user' };
    const token = 'token';
    const validUser = { email: 'lari@dev.com', password: 'secret_user' };
    const wrongPassword = { email: 'lari@dev.com', password: 'xxxxx' };


    it('Should return token when login is successful', async function () {
      sinon.stub(SequelizeUsers, 'findOne').resolves(user as any);
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

    it('Should return 401 when password is invalid', async function () {
      sinon.stub(SequelizeUsers, 'findOne').resolves(validUser as any);
      sinon.stub(JWT, 'sign').returns(token);
      sinon.stub(Validations, 'validationLogin').resolves();

      const { status, body } = await chai.request(app).post('/login').send(wrongPassword);
      expect(status).to.be.eq(401);
      expect(body).to.be.deep.eq({ message: 'Invalid email or password' });
    });
  });

  describe('Matches tests', function () {
    const matches = [
      {
        id: 1,
        homeTeamId: 16,
        homeTeamGoals: 1,
        awayTeamId: 8,
        awayTeamGoals: 1,
        inProgress: false,
        homeTeam: {
          teamName: 'São Paulo'
        },
        awayTeam: {
          'teamName': 'Grêmio'
        }
      },
      {
        id: 2,
        homeTeamId: 9,
        homeTeamGoals: 1,
        awayTeamId: 14,
        awayTeamGoals: 1,
        inProgress: true,
        homeTeam: {
          teamName: 'Internacional'
        },
        awayTeam: {
          teamName: 'Santos'
        }
      }
    ]
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
  });
  afterEach(sinon.restore);
});
