const { v4: uuidv4 } = require('uuid');
const shortid = require('shortid');
const mongoose = require('mongoose');
const Talk = require('../models/talkSchema');
module.exports = {
  async homepage(req, res) {
    try {
      res.render('index', { style: '/stylesheets/styles.min.css' });
    } catch (error) {
      res.render('error', error);
    }
  },

  // Add a new talk
  async createTalk(req, res) {
    try {
      const { name, email } = req.body;
      const talk = await Talk.create({
        name,
        creator: {
          creatorId: shortid.generate(),
          email,
        },
      });
      const myUrl = `${req.protocol}://${req.headers.host}/talk/create/${talk.url}`;
      return res.redirect(myUrl);
    } catch (error) {
      res.render('error', error);
    }
  },

  async roomPage(req, res) {
    try {
      const { talkid } = req.params;
      const talk = await Talk.findOne({ url: talkid });
      const myUrl = `${req.protocol}://${req.headers.host}/talk/${talk.url}?id=${talk.uuid}`;
      const url = `${req.protocol}://${req.headers.host}/talk/atend/${talk.url}`;

      res.render('room', {
        style: '/stylesheets/styles2.min.css',
        talk,
        myUrl,
        url,
      });
    } catch (error) {
      res.render('error', error);
    }
  },
  // // Add an attendee to a talk
  // async addAttendee(req, res) {
  //   try {
  //     const { talkId } = req.params;
  //     const { email } = req.body;
  //     // Get the talk
  //     const talk = await Talk.findOne({ url: talkId });
  //     // Check if the talk exists
  //     // If it does, add the attendee
  //     // If it doesn't, redirect to the homepage
  //     if (!talk) {
  //       return res.render('error', {
  //         message: 'Talk not found',
  //         error: {
  //           status: '404',
  //           stack: 'Talk not found',
  //         },
  //       });
  //     }
  //     // If the attendee is already in the talk, redirect to the talk page
  //     if (talk.attendees.some((attendee) => attendee.email === email)) {
  //       const url = `${req.protocol}://${req.headers.host}/talk/${talk.url}`;
  //       res.writeHead(302, {
  //         Location: url,
  //       });
  //       res.end();
  //     }

  //     // Add the attendee
  //     const attendee = {
  //       attendeeId: talk.uuid,
  //       email,
  //     };
  //     talk.attendees.push(attendee);
  //     await talk.save();
  //     res.writeHead(302, {
  //       Location: url,
  //     });
  //     res.end();
  //   } catch (error) {
  //     res.render('error', error);
  //   }
  // },

  async confrencePage(req, res) {
    try {
      console.log(req.query);
      console.log(req.params);
      res.render('dashboard', {
        layout: 'dash-head',
        roomId: req.params.talkid,
      });
    } catch (error) {
      res.render('error', error);
    }
  },

  async attendeeJoin(req, res) {
    try {
      const { talkid } = req.params;
      const { email } = req.body;

      // Check if the talk exists
      const talk = await Talk.findOne({ url: talkid });
      // If it does, add the attendee
      // If it doesn't, redirect to the homepage
      if (!talk) {
        return res.render('error', {
          message: 'Talk not found',
          error: {
            status: '404',
            stack: 'Talk not found',
          },
        });
      }

      if (talk.attandees.some((attandee) => attandee.email === email)) {
        const myUrl = `${req.protocol}://${req.headers.host}/talk/${talk.url}?id=${talk.uuid}`;
        return res.redirect(myUrl);
      }
      let attandeeId = shortid.generate();
      talk.attandees.push({
        attandeeId,
        email,
      });
      await talk.save();
      console.log(talk);
      const myUrl = `${req.protocol}://${req.headers.host}/talk/${talk.url}?id=${talk.uuid}`;
      return res.redirect(myUrl);
    } catch (error) {
      res.render('error', error);
    }
  },

  async joinPage(req, res) {
    try {
      res.render('joinRoom', {
        style: '/stylesheets/styles.min.css',
        id: req.params.talkid,
      });
    } catch (error) {
      res.render('error', error);
    }
  },
};
