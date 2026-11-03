import { test, expect } from '@playwright/test'

const EXPECTED_YOUTUBE_URL = 'https://www.youtube.com/@NT_DYWKSYCKS'

const VIEWPORTS = [
  { name: 'Mobile Small (360x640)', width: 360, height: 640 },
  { name: 'Mobile Standard (390x844)', width: 390, height: 844 },
  { name: 'Mobile Landscape / Keyboard Open (640x360)', width: 640, height: 360 },
  { name: 'Tablet Portrait (768x1024)', width: 768, height: 1024 },
  { name: 'Desktop FHD (1920x1080)', width: 1920, height: 1080 },
  { name: 'Ultrawide / 4K (3840x2160)', width: 3840, height: 2160 },
]

test.describe('NT DYWKSYCKS // Technical & Responsive QA Suite', () => {
  test('a) Renders with zero console.error or uncaught page exceptions', async ({ page }) => {
    const errors = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    page.on('pageerror', (err) => {
      errors.push(err.message)
    })

    await page.goto('/')
    await expect(page.locator('h1.nt-glitch-title')).toHaveText('NT DYWKSYCKS')

    const trapBtn = page.locator('.cryptic-trap-button')
    await trapBtn.hover()

    expect(errors).toEqual([])
  })

  test('b) Target button exists, stays within viewport bounds, and redirects securely to @NT_DYWKSYCKS', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')

    const trapBtn = page.locator('.cryptic-trap-button')
    await expect(trapBtn).toBeVisible()
    await expect(trapBtn).toContainText('[ERROR: EXTERNAL SIGNAL DETECTED - CLICK TO PURGE]')
    await expect(trapBtn).toContainText('TARGET_URI :: YOUTUBE.COM/@NT_DYWKSYCKS')

    await expect(trapBtn).toHaveAttribute('href', EXPECTED_YOUTUBE_URL)
    await expect(trapBtn).toHaveAttribute('target', '_blank')
    const rel = await trapBtn.getAttribute('rel')
    expect(rel).toContain('noopener')
    expect(rel).toContain('noreferrer')
  })

  for (const vp of VIEWPORTS) {
    test(`c) Responsive containment & button bounding rect inside ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height })
      await page.goto('/')

      const hasOverflow = await page.evaluate(() => {
        return (
          document.documentElement.scrollWidth > window.innerWidth ||
          document.documentElement.scrollHeight > window.innerHeight
        )
      })
      expect(hasOverflow).toBe(false)

      const trapBtn = page.locator('.cryptic-trap-button')
      await expect(trapBtn).toBeVisible()
      const box = await trapBtn.boundingBox()
      expect(box).not.toBeNull()

      expect(box.x).toBeGreaterThanOrEqual(0)
      expect(box.y).toBeGreaterThanOrEqual(0)
      expect(box.x + box.width).toBeLessThanOrEqual(vp.width)
      expect(box.y + box.height).toBeLessThanOrEqual(vp.height)
    })
  }
})

