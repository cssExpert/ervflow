<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  exclude-result-prefixes="sitemap image">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="robots" content="noindex, follow"/>
        <title>Sitemap — ERVFlow</title>
        <style>
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: #0a0a0a;
            color: #e4e4e7;
            min-height: 100vh;
            padding: 48px 24px;
          }

          .container {
            max-width: 900px;
            margin: 0 auto;
          }

          /* Header */
          .header {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 48px;
          }

          .logo-mark {
            width: 44px;
            height: 44px;
            background: linear-gradient(135deg, #f76235, #e04a1f);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 0 24px rgba(247,98,53,0.35);
          }

          .logo-mark svg {
            width: 24px;
            height: 24px;
            fill: white;
          }

          .header-text h1 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #fff;
            letter-spacing: -0.02em;
          }

          .header-text p {
            font-size: 0.8rem;
            color: #71717a;
            margin-top: 2px;
          }

          /* Stats bar */
          .stats {
            display: flex;
            gap: 12px;
            margin-bottom: 32px;
            flex-wrap: wrap;
          }

          .stat-pill {
            background: #18181b;
            border: 1px solid #27272a;
            border-radius: 999px;
            padding: 6px 14px;
            font-size: 0.75rem;
            color: #a1a1aa;
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .stat-pill span.dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #f76235;
            display: inline-block;
            box-shadow: 0 0 6px rgba(247,98,53,0.6);
          }

          .stat-pill strong {
            color: #e4e4e7;
          }

          /* Table */
          .table-wrap {
            background: #111113;
            border: 1px solid #27272a;
            border-radius: 16px;
            overflow: hidden;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.875rem;
          }

          thead tr {
            background: #18181b;
            border-bottom: 1px solid #27272a;
          }

          thead th {
            padding: 14px 20px;
            text-align: left;
            font-size: 0.7rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #71717a;
          }

          tbody tr {
            border-bottom: 1px solid #1c1c1f;
            transition: background 0.15s;
          }

          tbody tr:last-child {
            border-bottom: none;
          }

          tbody tr:hover {
            background: #18181b;
          }

          tbody td {
            padding: 16px 20px;
            vertical-align: middle;
          }

          /* URL cell */
          .url-cell {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .url-icon {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            background: #1c1c1f;
            border: 1px solid #27272a;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .url-icon svg {
            width: 14px;
            height: 14px;
            stroke: #71717a;
          }

          .url-link {
            color: #f76235;
            text-decoration: none;
            font-weight: 500;
            word-break: break-all;
            transition: color 0.15s;
          }

          .url-link:hover {
            color: #ff8c6b;
            text-decoration: underline;
          }

          /* Priority badge */
          .priority-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 24px;
            border-radius: 6px;
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.02em;
          }

          .priority-high   { background: rgba(247,98,53,0.15); color: #f76235; border: 1px solid rgba(247,98,53,0.3); }
          .priority-medium { background: rgba(251,191,36,0.12); color: #fbbf24; border: 1px solid rgba(251,191,36,0.25); }
          .priority-low    { background: rgba(113,113,122,0.15); color: #a1a1aa; border: 1px solid rgba(113,113,122,0.25); }

          /* Freq badge */
          .freq-badge {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 999px;
            font-size: 0.7rem;
            font-weight: 500;
            background: #1c1c1f;
            border: 1px solid #2d2d30;
            color: #a1a1aa;
            text-transform: capitalize;
          }

          .date-cell {
            color: #71717a;
            font-size: 0.8rem;
            font-variant-numeric: tabular-nums;
          }

          /* Footer */
          .footer {
            margin-top: 32px;
            text-align: center;
            font-size: 0.75rem;
            color: #3f3f46;
          }

          .footer a {
            color: #52525b;
            text-decoration: none;
          }

          .footer a:hover {
            color: #71717a;
          }
        </style>
      </head>
      <body>
        <div class="container">

          <!-- Header -->
          <div class="header">
            <div class="logo-mark">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div class="header-text">
              <h1>ERVFlow Sitemap</h1>
              <p>All publicly indexed pages — updated regularly</p>
            </div>
          </div>

          <!-- Stats -->
          <div class="stats">
            <div class="stat-pill">
              <span class="dot"></span>
              <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong> URLs indexed
            </div>
            <div class="stat-pill">
              <span class="dot"></span>
              Last updated <strong>2026-06-09</strong>
            </div>
            <div class="stat-pill">
              <span class="dot"></span>
              <strong>XML</strong> Sitemap v0.9
            </div>
          </div>

          <!-- Table -->
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Page URL</th>
                  <th>Priority</th>
                  <th>Frequency</th>
                  <th>Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <xsl:sort select="sitemap:priority" order="descending" data-type="number"/>
                  <tr>
                    <!-- URL -->
                    <td>
                      <div class="url-cell">
                        <div class="url-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                          </svg>
                        </div>
                        <a class="url-link" href="{sitemap:loc}">
                          <xsl:value-of select="sitemap:loc"/>
                        </a>
                      </div>
                    </td>

                    <!-- Priority -->
                    <td>
                      <xsl:variable name="p" select="sitemap:priority"/>
                      <xsl:choose>
                        <xsl:when test="$p >= 0.9">
                          <span class="priority-badge priority-high"><xsl:value-of select="$p"/></span>
                        </xsl:when>
                        <xsl:when test="$p >= 0.6">
                          <span class="priority-badge priority-medium"><xsl:value-of select="$p"/></span>
                        </xsl:when>
                        <xsl:otherwise>
                          <span class="priority-badge priority-low"><xsl:value-of select="$p"/></span>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>

                    <!-- Frequency -->
                    <td>
                      <span class="freq-badge"><xsl:value-of select="sitemap:changefreq"/></span>
                    </td>

                    <!-- Last Modified -->
                    <td class="date-cell">
                      <xsl:value-of select="sitemap:lastmod"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <div class="footer">
            <p>Generated by <a href="https://ervflow.com">ERVFlow</a> · <a href="/robots.txt">robots.txt</a></p>
          </div>

        </div>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
