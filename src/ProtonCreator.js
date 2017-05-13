function setupEmitter(pr, body) {
    const emitter = new Proton.Emitter();
    emitter.rate = new Proton.Rate(
        new Proton.Span(pr.rate[0], pr.rate[1]),
        new Proton.Span(0.1, 0.25),
    );
    emitter.addInitialize(new Proton.Body(body));

    if (pr.mass) {
        emitter.addInitialize(new Proton.Mass(pr.mass));
    }
    if (pr.radius) {
        if (typeof pr.radius === 'object') {
            emitter.addInitialize(new Proton.Radius(pr.radius[0], pr.radius[1]));
        } else {
            emitter.addInitialize(new Proton.Radius(pr.radius));
        }
    }
    if (pr.life) {
        if (typeof pr.life === 'object') {
            emitter.addInitialize(new Proton.Life(pr.life[0], pr.life[1]));
        } else {
            emitter.addInitialize(new Proton.Life(pr.life));
        }
    }
    if (typeof pr.spawn === 'number') {
        emitter.addInitialize(new Proton.Position(new Proton.BoxZone(pr.spawn)));
    } else if (typeof pr.spawn === 'object') {
        emitter.addInitialize(new Proton.Position(new Proton.PointZone(pr.spawn[0], pr.spawn[1])));
    }
    if (pr.velocity) {
        const dir = pr.velocity.direction;
        emitter.addInitialize(new Proton.Velocity(
            pr.velocity.speed,
            new Proton.Vector3D(dir[0], dir[1], dir[2]),
            pr.velocity.variance,
        ));
    }

    if (pr.alpha) {
        emitter.addBehaviour(new Proton.Alpha(pr.alpha[0], pr.alpha[1]));
    }
    if (pr.scale) {
        if (typeof pr.scale === 'object') {
            emitter.addBehaviour(new Proton.Scale(pr.scale[0], pr.scale[1]));
        } else {
            emitter.addBehaviour(new Proton.Scale(pr.scale));
        }
    }
    if (pr.colors) {
        if (pr.randomColors) {
            emitter.addBehaviour(new Proton.Color(pr.colors, 'random'));
        } else {
            emitter.addBehaviour(new Proton.Color(
                new THREE.Color(pr.colors[0]),
                new THREE.Color(pr.colors[1]),
            ));
        }
    }
    emitter.emit();
    return emitter;
}

function setupBody(shape) {
    let body;
    if (shape.type === 'mesh') {
        return shape.mesh;
    } else if (shape.type === 'sprite') {
        let spriteMap;
        if (typeof shape.texture === 'string') {
            spriteMap = new THREE.TextureLoader().load(shape.texture);
        } else {
            spriteMap = shape.texture;
        }
        const material = new THREE.SpriteMaterial({
            map: spriteMap,
            color: shape.color || 0xFFFFFF,
            blending: THREE.AdditiveBlending,
        });
        body = new THREE.Sprite(material);
    } else {
        let geometry;
        const material = new THREE.MeshBasicMaterial({
            color: shape.color || 0xFFFFFF,
        });
        if (shape.type === 'sphere') {
            geometry = new THREE.SphereGeometry(
                shape.radius,
                shape.segments || 8,
                shape.segments || 8,
            );
        } else if (shape.type === 'box') {
            geometry = new THREE.BoxGeometry(shape.size, shape.size, shape.size);
        }
        body = new THREE.Mesh(geometry, material);
    }
    return body;
}

class ProtonCreator {
    constructor(Proton, options) {
        this.destroyed = false;
        this.container = options.container;
        this.body = setupBody(options.body);
        this.proton = new Proton();

        const props = options.particleProps;
        this.emitter = setupEmitter(props, this.body);
        this.proton.addEmitter(this.emitter);
        this.proton.addRender(new Proton[options.renderType](this.container));
    }

    update() {
        this.proton.update();
    }

    destroy() {
        this.proton.destroy();
        this.destroyed = true;
    }
}

export default ProtonCreator;
