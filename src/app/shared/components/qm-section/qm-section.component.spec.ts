import { beforeEach, describe, expect, it } from 'vitest';

import { QmSectionComponent } from './qm-section.component';

describe('QmSection', () => {
  let component: QmSectionComponent;

  beforeEach(() => {
    component = new QmSectionComponent();
  });

  describe('size class generation', () => {
    it('defaults to no size class (md)', () => {
      expect(component.sectionClass).toContain('qm-section');
      expect(component.sectionClass).not.toContain('qm-section--md');
      expect(component.sectionClass).not.toContain('qm-section--sm');
      expect(component.sectionClass).not.toContain('qm-section--lg');
    });

    it('produces qm-section--sm when size is sm', () => {
      component.size = 'sm';
      expect(component.sectionClass).toContain('qm-section--sm');
    });

    it('produces qm-section--lg when size is lg', () => {
      component.size = 'lg';
      expect(component.sectionClass).toContain('qm-section--lg');
    });

    it('does not duplicate size class when set to md explicitly', () => {
      component.size = 'md';
      const matches = component.sectionClass.match(/qm-section--md/g);
      expect(matches).toBeNull();
    });
  });

  describe('surface class generation', () => {
    it('defaults to surface-canvas', () => {
      expect(component.sectionClass).toContain('surface-canvas');
    });

    it('produces surface-white when surface is white', () => {
      component.surface = 'white';
      expect(component.sectionClass).toContain('surface-white');
    });

    it('produces surface-subtle when surface is subtle', () => {
      component.surface = 'subtle';
      expect(component.sectionClass).toContain('surface-subtle');
    });

    it('produces surface-accent when surface is accent', () => {
      component.surface = 'accent';
      expect(component.sectionClass).toContain('surface-accent');
    });

    it('produces surface-dark when surface is dark', () => {
      component.surface = 'dark';
      expect(component.sectionClass).toContain('surface-dark');
    });
  });

  describe('independent size and surface', () => {
    it('combines size and surface classes independently', () => {
      component.size = 'sm';
      component.surface = 'subtle';
      expect(component.sectionClass).toContain('qm-section--sm');
      expect(component.sectionClass).toContain('surface-subtle');
      expect(component.sectionClass).not.toContain('surface-canvas');
    });

    it('always includes the base qm-section class', () => {
      component.size = 'lg';
      component.surface = 'dark';
      expect(component.sectionClass).toContain('qm-section');
      expect(component.sectionClass).toContain('qm-section--lg');
      expect(component.sectionClass).toContain('surface-dark');
    });
  });
});