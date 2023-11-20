import type {Metric} from 'web-vitals'
import {onCLS, onFCP, onFID, onLCP, onTTFB} from 'web-vitals'

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals'

type Options = {path: string; analyticsId: string}

const getConnectionSpeed = () => {
  return 'connection' in navigator &&
    navigator['connection'] &&
    'effectiveType' in (navigator['connection'] as unknown as {effectiveType: string})
    ? (navigator['connection'] as unknown as {effectiveType: string})['effectiveType']
    : ''
}

const sendToAnalytics = (metric: Metric, options: Options) => {
  const body = {
    dsn: options.analyticsId,
    id: metric.id,
    page: options.path,
    href: location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
  }
  const blob = new Blob([new URLSearchParams(body).toString()], {
    type: 'application/x-www-form-urlencoded',
  })
  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, blob)
  } else
    fetch(vitalsUrl, {
      body: blob,
      method: 'POST',
      credentials: 'omit',
      keepalive: true,
    })
}

export const sendToVercelAnalytics = () => {
  const analyticsId = process.env.PUBLIC_VERCEL_ANALYTICS_ID

  if (!analyticsId) {
    console.error('[Speed Insights] VERCEL_ANALYTICS_ID not found')
    return
  }

  const options: Options = {path: window.location.pathname, analyticsId}
  try {
    onFID(metric => sendToAnalytics(metric, options))
    onTTFB(metric => sendToAnalytics(metric, options))
    onLCP(metric => sendToAnalytics(metric, options))
    onCLS(metric => sendToAnalytics(metric, options))
    onFCP(metric => sendToAnalytics(metric, options))
  } catch (err) {
    console.error('[Analytics]', err)
  }
}
