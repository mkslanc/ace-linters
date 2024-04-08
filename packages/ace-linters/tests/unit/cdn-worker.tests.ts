import { expect } from 'chai';
import { getServices } from '../../src/cdn-worker';
import {SupportedServices} from "../../src/types/language-service";

describe('getServices', () => {
    it('should return all services when includeLinters is true', () => {
        const services = getServices(true);
        expect(services).to.have.lengthOf(12);
    });

    it('should return an empty array when includeLinters is false', () => {
        const services = getServices(false);
        expect(services).to.be.an('array').that.is.empty;
    });

    it('should filter services based on includeLinters object keys', () => {
        const includeLinters: { [name in SupportedServices]?: boolean | undefined } = {
            json: true,
            html: false,
            css: true,
            less: false,
            scss: false,
            typescript: true,
            lua: false,
            yaml: false,
            xml: false,
            php: false,
            eslint: false,
            python: false,
        };
        const services = getServices(includeLinters);
        expect(services).to.have.lengthOf(3);
        expect(services.map(service => service.name)).to.include.members(['json', 'css', 'typescript']);
    });

    it('should return an empty array when includeLinters is an empty object', () => {
        const includeLinters: { [name in SupportedServices]?: boolean } = {};
        const services = getServices(includeLinters);
        expect(services).to.be.an('array').that.is.empty;
    });

    it('should ignore invalid keys in includeLinters object', () => {
        const includeLinters: { [name: string]: boolean } = {
            json: true,
            invalidKey: true,
        };
        const services = getServices(includeLinters);
        expect(services).to.have.lengthOf(1);
        expect(services[0].name).to.equal('json');
    });

    it('should include eslint service when includeLinters.javascript is true', () => {
        const includeLinters: { [name in SupportedServices]?: boolean } = {
            javascript: true,
        };
        const services = getServices(includeLinters);
        expect(services).to.have.lengthOf(1);
        expect(services[0].name).to.equal('eslint');
    });
});
