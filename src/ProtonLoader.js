import ProtonCreator from './ProtonCreator';

export class ProtonLoader {
    constructor(Proton) {
        this.Proton = Proton;
        this.particles = [];
    }

    createParticles(options) {
        const particleSystem = new ProtonCreator(Proton, options);
        this.particles.push(particleSystem);
        return particleSystem;
    }

    update() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            if (this.particles[i].destroyed) {
                this.particles.splice(i, 1);
            } else {
                this.particles[i].update();
            }
        }
    }
}