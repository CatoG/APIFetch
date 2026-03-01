function degToCompass(deg) {
  const dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  return dirs[Math.round(deg / 22.5) % 16];
}

function getBackground(symbolCode) {
  const s = (symbolCode || '').toLowerCase();
  if (s.includes('thunder'))         return 'linear-gradient(135deg, #1a0030, #2d0050, #0a0020)';
  if (s.includes('snow') || s.includes('sleet')) return 'linear-gradient(135deg, #2a3a5c, #4a6080, #6a8aaa)';
  if (s.includes('rain') || s.includes('drizzle') || s.includes('shower')) return 'linear-gradient(135deg, #0d1b2a, #1b2d40, #1a3550)';
  if (s.includes('fog'))             return 'linear-gradient(135deg, #2a2a2a, #3d3d4a, #4a4a5a)';
  if (s.includes('cloudy') || s.includes('overcast')) return 'linear-gradient(135deg, #1a1f2e, #2a3040, #1e2a3a)';
  if (s.includes('night'))           return 'linear-gradient(135deg, #050a18, #0a1428, #0d1f3c)';
  if (s.includes('fair') || s.includes('partlycloudy')) return 'linear-gradient(135deg, #0d2137, #1a3a5c, #1e4d7a)';
  if (s.includes('clearsky') || s.includes('clear')) return 'linear-gradient(135deg, #0a2a4a, #1a5080, #1e6fa8)';
  return 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)';
}

function getHourlyColor(symbolCode) {
  const s = (symbolCode || '').toLowerCase();
  if (s.includes('thunder'))         return { bg: 'rgba(90,20,160,0.55)',   border: 'rgba(180,100,255,0.7)',  text: '#d4aaff' };
  if (s.includes('snow'))            return { bg: 'rgba(200,225,255,0.18)', border: 'rgba(200,230,255,0.6)',  text: '#cce8ff' };
  if (s.includes('sleet'))           return { bg: 'rgba(80,160,200,0.25)',  border: 'rgba(120,200,240,0.55)', text: '#a0d8f0' };
  if (s.includes('rain') || s.includes('shower') || s.includes('drizzle')) return { bg: 'rgba(20,70,160,0.45)', border: 'rgba(60,140,255,0.6)', text: '#80b8ff' };
  if (s.includes('fog'))             return { bg: 'rgba(110,115,130,0.4)',  border: 'rgba(180,185,200,0.5)',  text: '#c8cad4' };
  if (s.includes('overcast'))        return { bg: 'rgba(55,60,80,0.5)',     border: 'rgba(120,130,160,0.5)',  text: '#a0a8c0' };
  if (s.includes('cloudy'))          return { bg: 'rgba(40,65,110,0.45)',   border: 'rgba(90,140,210,0.55)',  text: '#90b8e8' };
  if (s.includes('night') && (s.includes('fair') || s.includes('clear') || s.includes('partly'))) return { bg: 'rgba(10,15,50,0.6)', border: 'rgba(100,120,220,0.55)', text: '#a0b0f0' };
  if (s.includes('partlycloudy'))    return { bg: 'rgba(25,75,145,0.4)',    border: 'rgba(80,160,235,0.55)',  text: '#88c4f4' };
  if (s.includes('fair') || s.includes('clearsky') || s.includes('clear')) return { bg: 'rgba(15,100,200,0.45)', border: 'rgba(60,180,255,0.65)', text: '#60d0ff' };
  return { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.15)', text: '#e0e0e0' };
}

function getHeroImage(symbolCode) {
  const s = (symbolCode || '').toLowerCase();
  if (s.includes('thunder'))    return 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=900&q=70';
  if (s.includes('snow'))       return 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=900&q=70';
  if (s.includes('sleet'))      return 'https://images.unsplash.com/photo-1548777123-e216912df7d8?w=900&q=70';
  if (s.includes('rain') || s.includes('shower') || s.includes('drizzle')) return 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=900&q=70';
  if (s.includes('fog'))        return 'https://images.unsplash.com/photo-1543968996-ee822b8176ba?w=900&q=70';
  if (s.includes('overcast'))   return 'https://images.unsplash.com/photo-1504608524841-42584120d693?w=900&q=70';
  if (s.includes('cloudy'))     return 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=900&q=70';
  if (s.includes('night'))      return 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=900&q=70';
  if (s.includes('fair') || s.includes('partlycloudy')) return 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=900&q=70';
  return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=70';
}


function useMyLocation() {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser.');
    return;
  }
  const btn = document.querySelector('.btn-locate');
  btn.textContent = 'Locating...';
  btn.disabled = true;
  navigator.geolocation.getCurrentPosition(
    pos => {
      document.getElementById('lat').value = pos.coords.latitude.toFixed(4);
      document.getElementById('lon').value = pos.coords.longitude.toFixed(4);
      if (pos.coords.altitude !== null) {
        document.getElementById('altitude').value = Math.round(pos.coords.altitude);
      }
      btn.textContent = '\u9737 My Location';
      btn.disabled = false;
      document.getElementById('weatherForm').requestSubmit();
    },
    err => {
      alert('Could not get location: ' + err.message);
      btn.textContent = '\u9737 My Location';
      btn.disabled = false;
    }
  );
}

function showweatherDetails(event) {
      event.preventDefault();

      const lat = document.getElementById('lat').value;
      const lon = document.getElementById('lon').value;
      const altitude = document.getElementById('altitude').value;
      const apiUrl = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}&altitude=${altitude}`;

      fetch(apiUrl, {
        headers: { 'User-Agent': 'WeatherReportApp/1.0' }
      })
        .then(response => response.json())
        .then(data => {
          const weatherInfo = document.getElementById('weatherInfo');
          const current = data.properties.timeseries[0].data;
          const details = current.instant.details;
          const summary = current.next_1_hours?.summary.symbol_code ?? 'N/A';
          const precip1h = current.next_1_hours?.details.precipitation_amount ?? 'N/A';
          const next6 = current.next_6_hours?.summary.symbol_code?.replace(/_/g, ' ') ?? 'N/A';
          const precip6h = current.next_6_hours?.details.precipitation_amount ?? 'N/A';
          const next12 = current.next_12_hours?.summary.symbol_code?.replace(/_/g, ' ') ?? 'N/A';
          const windDir = degToCompass(details.wind_from_direction);
          const uv = details.ultraviolet_index_clear_sky ?? null;
          const updatedAt = new Date(data.properties.meta.updated_at).toLocaleString();
          const dataTime = new Date(data.properties.timeseries[0].time).toLocaleString();

          // Dynamic background
          document.body.style.background = getBackground(summary);

          // Hourly forecast strip (next 12 entries)
          const hourlyCards = data.properties.timeseries.slice(0, 12).map((entry, i) => {
            const t = new Date(entry.time);
            const timeLabel = t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const temp = entry.data.instant.details.air_temperature;
            const condCode = entry.data.next_1_hours?.summary.symbol_code ?? entry.data.next_6_hours?.summary.symbol_code ?? '';
            const cond = condCode.replace(/_/g, ' ');
            const col = getHourlyColor(condCode);
            const style = `style="background:${col.bg};border-color:${col.border};"`;
            return `<div class="hourly-card${i === 0 ? ' now' : ''}" ${style}>
              <div class="h-time">${i === 0 ? 'Now' : timeLabel}</div>
              <div class="h-temp" style="color:${col.text}">${temp}°</div>
              <div class="h-cond">${cond || '—'}</div>
            </div>`;
          }).join('');
          const heroImage = getHeroImage(summary);
          weatherInfo.innerHTML = `
            <div class="animate">
              <div class="hourly-strip">${hourlyCards}</div>
            </div>
            <div class="hero-card animate animate-delay-1">
              <div class="hero-card-bg" style="background-image:url('${heroImage}')"></div>
              <div class="hero-card-overlay"></div>
              <div class="hero-card-content">
                <div class="hero-location">&#9675; ${lat}, ${lon}</div>
                <div class="hero-temp-row">
                  <div class="hero-temp">${details.air_temperature}<sup>°C</sup></div>
                  <div class="hero-right">
                    <div class="hero-condition">${summary.replace(/_/g, ' ')}</div>
                    <div class="hero-feels">Humidity ${details.relative_humidity}%</div>
                  </div>
                </div>
                <div class="hero-divider"></div>
                <div class="hero-meta">Data: ${dataTime} &nbsp;&middot;&nbsp; Updated: ${updatedAt}</div>
              </div>
            </div>
            <div class="detail-card animate animate-delay-2">
              <div class="detail-section-label">Wind &amp; Atmosphere</div>
              <div class="detail-grid">
                <div class="detail-item"><div class="detail-label">Wind Speed</div><div class="detail-value">${details.wind_speed} m/s</div></div>
                <div class="detail-item"><div class="detail-label">Wind Direction</div><div class="detail-value">${windDir} &nbsp;<span style="font-size:0.75rem;color:rgba(255,255,255,0.35)">${details.wind_from_direction}&deg;</span></div></div>
                <div class="detail-item"><div class="detail-label">Pressure</div><div class="detail-value">${details.air_pressure_at_sea_level} <span style="font-size:0.75rem;font-weight:400;color:rgba(255,255,255,0.4)">hPa</span></div></div>
                <div class="detail-item"><div class="detail-label">Cloud Cover</div><div class="detail-value">${details.cloud_area_fraction}%</div></div>
                <div class="detail-item"><div class="detail-label">UV Index</div><div class="detail-value">${uv !== null ? uv : '—'}</div></div>
              </div>
              <div class="section-divider"></div>
              <div class="detail-section-label">Precipitation</div>
              <div class="detail-grid">
                <div class="detail-item"><div class="detail-label">Next 1 hour</div><div class="detail-value">${precip1h} <span style="font-size:0.75rem;font-weight:400;color:rgba(255,255,255,0.4)">mm</span></div></div>
                <div class="detail-item"><div class="detail-label">Next 6 hours</div><div class="detail-value">${precip6h} <span style="font-size:0.75rem;font-weight:400;color:rgba(255,255,255,0.4)">mm</span></div></div>
              </div>
              <div class="section-divider"></div>
              <div class="detail-section-label">Forecast</div>
              <div class="detail-grid">
                <div class="detail-item"><div class="detail-label">6 hours</div><div class="detail-value" style="font-size:0.95rem;text-transform:capitalize">${next6}</div></div>
                <div class="detail-item"><div class="detail-label">12 hours</div><div class="detail-value" style="font-size:0.95rem;text-transform:capitalize">${next12}</div></div>
              </div>
            </div>
            <div class="raw-json animate animate-delay-3">
              <h3>Raw JSON</h3>
              <pre>${JSON.stringify(data, null, 2)}</pre>
            </div>`;
        })
        .catch(err => {
          document.getElementById('weatherInfo').innerHTML = `<p>Error fetching weather data.</p>`;
          console.error(err);
        });
}

document.getElementById('weatherForm').addEventListener('submit', showweatherDetails);
