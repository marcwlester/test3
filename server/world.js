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
    update: function (dt) {
        var entities, position, velocity;

        entities = this.world.getEntities('position', 'velocity');

        entities.forEach(function (entity) {
            position = entity.getComponent('position');
            velocity = entity.getComponent('velocity');
            position.x += velocity.x * dt;
            position.y += velocity.y * dt;
            //console.log(dt);
        });
    }
});

EntityFactory = (function() {
  return {
    "nerb": function() {
      var ent = new CES.Entity();
      ent.addComponent(new Position(0,0));
      ent.addComponent(new Velocity(0,0));
      ent.addComponent(new Health(100));
      return ent;
    }
  };
})();

Game = (function() {
  var world = null;
  return {
    "init": function() {
      this.world = new CES.World();
      this.world.addEntity(EntityFactory.nerb());
      this.world.addSystem(new PhysicSystem());
    },
    "getWorld": function() {
      return this.world;
    }
  }
});
