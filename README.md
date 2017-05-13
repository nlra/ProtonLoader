# ProtonLoader
ProtonLoader is a class to make [three.proton](https://github.com/a-jie/three.proton) easier to use. It provides a very easy API to create your particle system by instantiating a single class, with object based parameters

## Usage

```javascript
const particles = new ProtonLoader({
    container: scene, // Your three.js scene
    renderType: 'MeshRender',
    body: {
        type: 'sphere',
        radius: 3,
        segments: 8,
    },
    particleProps: {
        rate: [4, 16],
        position: [0, 0],
        mass: 1,
        radius: [6, 12],
        life: 3,
        alpha: [1, 0],
        scale: [0.1, 1.3],
        colors: [0xFF0000, 0x00FF00],
        velocity: {
            speed: 45,
            direction: [0, 1, 0],
            variance: 180,
        },
    },
});
```

This will create a new `Proton` instance, using the given parameters to setup the particle emitter.

## Update Function

In order for your particles to be updated every frame, you need to call the `update` function.

```javascript
function update() {
  myParticles.update();
  window.requestAnimationFrame(update);
}
```

## Options

### Container

The `container` property has to be a `three.js` object. Either your scene, or another object in your scene. The particles will be created in this object.

### renderType

The `renderType` option has to be specified, and defines the type of mesh that will be used for the particle. The most common options are:

* `MeshRender` Any kind of mesh
* `SpriteRender` A 2D sprite

The ProtonLoader just gives this `renderType` to Proton, which uses it internally. See Proton's doc/code for more info.

## body

The `body` option defines what your particle is. You have multiple type of bodies available:

* `sphere` Will create a `three.js` `SphereGeometry`. It uses the following properties:
  * `radius`
  * `segments` (number of segments in the geometry, default is 8
* `box` Will create a `three.js` `BoxGeometry`. It uses the following properties:
  * `size`
* `mesh` Will use a provided mesh object as particle. This allows you to create particles based on any kind of object you want. It uses:
  * 'mesh': any kind of `three.js` `Object3D` that Proton will use as a source for the particles
* 'sprite' Will create a 2D sprite. It uses:
  * `src` Can be either a `three.js` `Texture`, or a `string` containing the url of the image. If `src` is an url, a `THREE.TextureLoader` will be created to load the image.
Example:

```javascript
body: {
  type: 'mesh',
  mesh: myThreeJSMesh
};

body: {
  type: 'box',
  size: 2
};
```

## particleProps

The `particleProps` property contains all the properties that can be applied to the particle emitter.

In `three.proton`, you usually setup your particle properties by calling functions for each of them. For example:

```javascript
emitter.addInitialize(new Proton.Radius(6, 12));
emitter.addBehaviour(new Proton.Alpha(1, 0));
```

With `ProtonLoader`, those properties are just passed as parameters in the `particleProps` object, and `ProtonLoader` will call those functions for you:

```javascript
const myParticles = new ProtonLoader({
  container: scene,
  renderType: 'MeshRender',
  body: {
    type: 'sprite',
    src: 'myImage.png'
  },
  particleProps: {
    radius: [6, 12], // The ProtonLoader will launch emitter.addInitialize(new Proton.Radius(6, 12)); 
    alpha: [1, 0]
  }
});
```
