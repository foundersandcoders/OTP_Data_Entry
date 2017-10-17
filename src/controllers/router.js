const router = require('express').Router();
const placeController = require('./places/index.js');
const eventsController = require('./events/index.js');
const placesList = require('../middleware/getPlaceNameAndId.js');
const oauthCode = require('./OAuth/code.js');
const oauthToken = require('./OAuth/token.js');

router.get('/', require('./home.js'));
router.get('/:lang/content', require('../content.js'));

// places
router.get('/:lang/places', placeController.getAll);
router.get('/:lang/place/:id', placeController.getSpecific);
router.get('/:lang/add-place', placeController.renderForm);
router.post('/:lang/add-place', placeController.addPlace);
router.get('/:lang/edit-place/:id', placeController.renderEditForm);
router.post('/:lang/edit-place/:id', placeController.addPlace);
router.get('/:lang/delete-place/:id', placeController.deletePlace);

// events
router.get('/:lang/events', eventsController.getAll);
router.get('/:lang/event/:id', eventsController.getSpecific);
router.get('/:lang/delete-event/:id', eventsController.deleteEvent);
router.get('/:lang/add-event', placesList, eventsController.renderForm);
router.post('/:lang/add-event', eventsController.addEvent);
router.get('/:lang/edit-event/:id', placesList, eventsController.renderEditForm);
router.post('/:lang/edit-event/:id', eventsController.addEvent);

router.get('/:lang/loginOauth', oauthCode);
router.get('/oauth/token', oauthToken);

module.exports = router;
