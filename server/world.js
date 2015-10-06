var Box2D = Npm.require("box2dweb");
var CES = Npm.require('ces');

Position = CES.Component.extend({
    name: 'position',
    init: function (x, y) {
        this.x = x;
        this.y = y;
    }
});

Velocity = CES.Component.extend({
    name: 'velocity',
    init: function (x, y) {
        this.x = x;
        this.y = y;
    }
});

PhysicsComponent = CES.Component.extend({
  name: 'physics',
  init: function (bodyDef, fixtureDef) {
    this.bodyDef = bodyDef;
    this.fixtureDef = fixtureDef;
    this.body = null;
  }
});

Health = CES.Component.extend({
    name: 'health',
    init: function (maxHealth) {
        this.health = this.maxHealth = maxHealth;
    },
    isDead: function () {
        return this.health <= 0;
    },
    receiveDamage: function (damage) {
        this.health -= damage;
    }
});


PhysicSystem = CES.System.extend({
  box2dWorld: null,

  init: function(box2dworld) {
    this._super();
    this.box2dWorld = box2dworld;
  },

  addedToWorld: function(world) {
    this._super(world);

    // add the entity to the box 2d world when an entity is added
    world.entityAdded('physics').add(function(entity) {
      var bodyComponent = entity.getComponent('physics');
      bodyComponent.body = this.box2dWorld.CreateBody(bodyComponent.bodyDef);
      bodyComponent.body.CreateFixture(bodyComponent.fixtureDef);
    });

    // remove the entity from the box2d world when an entity is removed
    world.entityRemoved('physics').add(function(entity) {
      var bodyComponent = entity.getComponent('physics');
      this.box2dWorld.DestroyBody(bodyComponent.body);
      bodyComponent.body = null;
    });
  },

  update: function (dt) {
    var entities, position, velocity;
    if (this.box2dWorld !== null) {

      this.box2dWorld.Step(dt, 10, 10);

      entities = this.world.getEntities('physics');
      //entities.forEach(function (entity) {
      //});
    }
  }

});

EntityFactory = (function() {
  return {
    "nerb": function() {
      var ent = new CES.Entity();
      var defs = PhysicsBodyFactory.createTestDefs(0,0);
      ent.addComponent(new PhysicsComponent(defs.body, defs.fixture));
      ent.addComponent(new Health(100));
      return ent;
    }
  };
})();

Game = (function() {
  var world = null;
  return {
    "step": 1/60,
    "init": function() {
      this.world = new CES.World();
      this.world.addEntity(EntityFactory.nerb());
      this.world.addSystem(new PhysicSystem(new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0,0))));
    },
    "tick": function () {
      this.world.update(this.step);
    },
    "getWorld": function() {
      return this.world;
    }
  }
});
