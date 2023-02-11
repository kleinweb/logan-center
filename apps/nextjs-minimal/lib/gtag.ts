// SPDX-FileCopyrightText: 2022-2023 Temple University
// SPDX-License-Identifier: GPL-3.0-or-later

// TODO: get this from the config file generated by nix
export const GA_TRACKING_ID = 'G-XGLD9S5QW3'

/**
 * Send a pageview to Google Analytics.
 * @param url URL of the viewed page.
 * @see {@link https://developers.google.com/analytics/devguides/collection/gtagjs/pages}
 */
export const registerPageview = (url: Gtag.ConfigParams['page_path']) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

type DispatchEventArgs = {
  action: Gtag.EventNames | (string & {})
  category: Gtag.EventParams['event_category']
  label: Gtag.EventParams['event_label']
  value: Gtag.EventParams['value']
}

/** @see {@link https:developers.google.com/analytics/devguides/collection/gtagjs/events} */
export const dispatchEvent = ({
  action,
  category,
  label,
  value,
}: DispatchEventArgs) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}