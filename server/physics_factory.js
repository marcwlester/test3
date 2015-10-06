var Box2D = Npm.require("box2dweb");

PhysicsHelper = (function() {
  return {
    ratio: 1, // 1 tile = 1 meter
    physicsToWorld: function (n) {
      return n;
    },
    worldToPhysics: function (n) {
      return n;
    }
  }
})();

PhysicsBodyFactory = (function() {
  var b2BodyDef = Box2D.Dynamics.b2BodyDef;
  var b2FixtureDef	= Box2D.Dynamics.b2FixtureDef;
  var b2Body = Box2D.Dynamics.b2Body;
  var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

  return {
    createTestDefs: function( x, y ) {
      var bxFixDef = new b2FixtureDef();
      bxFixDef.shape = new b2PolygonShape();
      bxFixDef.density = 1;

      var bodyDef = new b2BodyDef();
      bodyDef.type = b2Body.b2_dynamicBody;
      bxFixDef.shape.SetAsBox(1, 1);
      bodyDef.position.Set(PhysicsHelper.worldToPhysics(x), PhysicsHelper.worldToPhysics(y));

      return {
        body: bodyDef,
        fixture: bxFixDef
      }
    }
  };
})();
