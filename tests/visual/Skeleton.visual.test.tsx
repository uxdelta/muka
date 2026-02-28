import { describe, it, expect } from 'vitest';
import { page } from 'vitest/browser';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard } from '../../components/Skeleton';
import '../../components/Skeleton/Skeleton.css';

describe('Skeleton Visual Regression Tests', () => {
  const renderInContainer = async (component: React.ReactElement) => {
    const container = document.createElement('div');
    container.setAttribute('data-testid', 'spec');
    container.style.width = '400px';
    container.style.background = 'white';
    container.style.padding = '1rem';
    document.body.appendChild(container);

    const root = createRoot(container);
    root.render(component);

    await new Promise(resolve => setTimeout(resolve, 0));

    return container;
  };

  describe('Base Skeleton Variants', () => {
    it('should match rectangular variant', async () => {
      await renderInContainer(<Skeleton variant="rectangular" width={200} height={20} />);

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      document.body.innerHTML = '';
    });

    it('should match rounded variant', async () => {
      await renderInContainer(<Skeleton variant="rounded" width={200} height={20} />);

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      document.body.innerHTML = '';
    });

    it('should match circular variant', async () => {
      await renderInContainer(<Skeleton variant="circular" width={40} height={40} />);

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      document.body.innerHTML = '';
    });
  });

  describe('Animations', () => {
    it('should match pulse animation', async () => {
      await renderInContainer(<Skeleton animation="pulse" width={200} height={20} />);

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      document.body.innerHTML = '';
    });

    it('should match wave animation', async () => {
      await renderInContainer(<Skeleton animation="wave" width={200} height={20} />);

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      document.body.innerHTML = '';
    });

    it('should match no animation', async () => {
      await renderInContainer(<Skeleton animation="none" width={200} height={20} />);

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      document.body.innerHTML = '';
    });
  });

  describe('SkeletonText', () => {
    it('should match text with 3 lines', async () => {
      await renderInContainer(
        <div style={{ width: '350px' }}>
          <SkeletonText lines={3} />
        </div>
      );

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      document.body.innerHTML = '';
    });

    it('should match text with custom last line width', async () => {
      await renderInContainer(
        <div style={{ width: '350px' }}>
          <SkeletonText lines={4} lastLineWidth="60%" />
        </div>
      );

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      document.body.innerHTML = '';
    });

    it('should match text with tight spacing', async () => {
      await renderInContainer(
        <div style={{ width: '350px' }}>
          <SkeletonText lines={3} spacing="tight" />
        </div>
      );

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      document.body.innerHTML = '';
    });
  });

  describe('SkeletonAvatar', () => {
    it('should match avatar sizes', async () => {
      await renderInContainer(
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <SkeletonAvatar size="xs" />
          <SkeletonAvatar size="sm" />
          <SkeletonAvatar size="md" />
          <SkeletonAvatar size="lg" />
          <SkeletonAvatar size="xl" />
        </div>
      );

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      document.body.innerHTML = '';
    });
  });

  describe('SkeletonCard', () => {
    it('should match full card', async () => {
      await renderInContainer(
        <div style={{ width: '343px' }}>
          <SkeletonCard />
        </div>
      );

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      document.body.innerHTML = '';
    });

    it('should match card without image', async () => {
      await renderInContainer(
        <div style={{ width: '343px' }}>
          <SkeletonCard showImage={false} />
        </div>
      );

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      document.body.innerHTML = '';
    });

    it('should match card without actions', async () => {
      await renderInContainer(
        <div style={{ width: '343px' }}>
          <SkeletonCard showActions={false} />
        </div>
      );

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      document.body.innerHTML = '';
    });
  });

  describe('Real-world Examples', () => {
    it('should match user profile loading state', async () => {
      await renderInContainer(
        <div
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start',
            width: '350px',
          }}
        >
          <SkeletonAvatar size="lg" />
          <div style={{ flex: 1 }}>
            <Skeleton width="120px" height={20} variant="rounded" style={{ marginBottom: 8 }} />
            <SkeletonText lines={2} lastLineWidth="80%" />
          </div>
        </div>
      );

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      document.body.innerHTML = '';
    });

    it('should match list loading state', async () => {
      await renderInContainer(
        <div 
          style={{ 
            width: '350px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {Array(3).fill(0).map((_, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
              }}
            >
              <SkeletonAvatar size="md" />
              <div style={{ flex: 1 }}>
                <Skeleton width="40%" height={16} variant="rounded" style={{ marginBottom: 6 }} />
                <Skeleton width="60%" height={14} variant="rounded" />
              </div>
              <Skeleton width={60} height={32} variant="rounded" />
            </div>
          ))}
        </div>
      );

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      document.body.innerHTML = '';
    });
  });

  describe('Different Sizes', () => {
    it('should match size variations', async () => {
      await renderInContainer(
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
          <Skeleton width={350} height={12} variant="rounded" />
          <Skeleton width={300} height={16} variant="rounded" />
          <Skeleton width={250} height={20} variant="rounded" />
          <Skeleton width={200} height={24} variant="rounded" />
        </div>
      );

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      document.body.innerHTML = '';
    });
  });
});
