function initInvestmentChart() {
  const o = document.getElementById("investmentChart");
  if (!o) return;
  if ("undefined" == typeof Chart)
    return void setTimeout(initInvestmentChart, 100);
  const t = o.getContext("2d"),
    e = window.innerWidth < 768,
    r = window.innerWidth >= 768 && window.innerWidth < 1024;
  let i = !1;
  const n = new Chart(t, {
    type: "line",
    data: {
      labels: [
        2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036,
      ],
      datasets: [
        {
          label: "Conservative",
          data: [30, 30, 30, 65, 100, 57, 15, 32, 50, 45, 40],
          borderColor: "rgb(239, 68, 68)",
          backgroundColor: "rgba(239, 68, 68, 0.3)",
          fill: !0,
          tension: 0.4,
          borderWidth: e ? 1.5 : 1,
          pointRadius: e ? 3 : 4,
          pointBackgroundColor: "rgb(239, 68, 68)",
          pointBorderColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: e ? 5 : 6,
        },
        {
          label: "Balanced",
          data: [75, 90, 115, 150, 185, 107, 30, 62, 95, 112, 130],
          borderColor: "rgb(34, 197, 94)",
          backgroundColor: "rgba(34, 197, 94, 0.3)",
          fill: !0,
          tension: 0.4,
          borderWidth: e ? 1.5 : 1,
          pointRadius: e ? 3 : 4,
          pointBackgroundColor: "rgb(34, 197, 94)",
          pointBorderColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: e ? 5 : 6,
        },
        {
          label: "Aggressive",
          data: [130, 157, 185, 230, 260, 187, 115, 135, 155, 175, 210],
          borderColor: "rgb(234, 179, 8)",
          backgroundColor: "rgba(234, 179, 8, 0.3)",
          fill: !0,
          tension: 0.4,
          borderWidth: e ? 1.5 : 1,
          pointRadius: e ? 3 : 4,
          pointBackgroundColor: "rgb(234, 179, 8)",
          pointBorderColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: e ? 5 : 6,
        },
      ],
    },
    options: {
      responsive: !0,
      maintainAspectRatio: !0,
      aspectRatio: e ? 1.2 : r ? 1.8 : 2,
      plugins: {
        title: {
          display: !0,
          text: "Annual Investment Returns",
          color: "#fff",
          font: { size: e ? 14 : r ? 16 : 18, weight: "bold" },
          padding: { top: e ? 5 : 10, bottom: e ? 10 : 20 },
        },
        legend: {
          display: !0,
          position: "bottom",
          labels: {
            color: "#fff",
            padding: e ? 6 : 10,
            font: { size: e ? 8 : r ? 9 : 10 },
            usePointStyle: !0,
            pointStyle: "circle",
            boxWidth: e ? 6 : 8,
            boxHeight: e ? 6 : 8,
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "#fff",
          bodyColor: "#fff",
          borderColor: "rgba(255, 255, 255, 0.1)",
          borderWidth: 1,
          padding: e ? 8 : 12,
          titleFont: { size: e ? 11 : 12 },
          bodyFont: { size: e ? 10 : 11 },
          displayColors: !0,
          callbacks: {
            label: function (o) {
              return o.dataset.label + ": " + o.parsed.y;
            },
          },
        },
      },
      scales: {
        x: {
          title: { display: !1 },
          ticks: {
            color: "rgba(255, 255, 255, 0.7)",
            font: { size: e ? 9 : r ? 10 : 11 },
            maxRotation: 0,
            callback: function (o, t) {
              return e
                ? t % 3 == 0
                  ? this.getLabelForValue(o)
                  : ""
                : t % 2 == 0
                  ? this.getLabelForValue(o)
                  : "";
            },
          },
          grid: { display: !1, drawBorder: !1 },
          border: { display: !1 },
        },
        y: {
          title: { display: !1 },
          beginAtZero: !0,
          max: 300,
          ticks: {
            color: "rgba(255, 255, 255, 0.7)",
            font: { size: e ? 9 : r ? 10 : 11 },
            stepSize: e ? 120 : 60,
            callback: function (o) {
              return o;
            },
          },
          grid: { display: !1, drawBorder: !1 },
          border: { display: !1 },
        },
      },
      interaction: { intersect: !1, mode: "index" },
      animation: {
        onComplete: function () {
          if (i) return;
          i = !0;
          const o = this.chart || n,
            t = o.chartArea;
          if (!t) return;
          const e = o.data.datasets,
            r = o.ctx;
          if (e[0] && !e[0]._gradientApplied) {
            const o = r.createLinearGradient(0, t.top, 0, t.bottom);
            (o.addColorStop(0, "rgba(239, 68, 68, 0.4)"),
              o.addColorStop(0.5, "rgba(239, 68, 68, 0.2)"),
              o.addColorStop(1, "rgba(239, 68, 68, 0)"),
              (e[0].backgroundColor = o),
              (e[0]._gradientApplied = !0));
          }
          if (e[1] && !e[1]._gradientApplied) {
            const o = r.createLinearGradient(0, t.top, 0, t.bottom);
            (o.addColorStop(0, "rgba(34, 197, 94, 0.4)"),
              o.addColorStop(0.5, "rgba(34, 197, 94, 0.2)"),
              o.addColorStop(1, "rgba(34, 197, 94, 0)"),
              (e[1].backgroundColor = o),
              (e[1]._gradientApplied = !0));
          }
          if (e[2] && !e[2]._gradientApplied) {
            const o = r.createLinearGradient(0, t.top, 0, t.bottom);
            (o.addColorStop(0, "rgba(234, 179, 8, 0.4)"),
              o.addColorStop(0.5, "rgba(234, 179, 8, 0.2)"),
              o.addColorStop(1, "rgba(234, 179, 8, 0)"),
              (e[2].backgroundColor = o),
              (e[2]._gradientApplied = !0));
          }
          requestAnimationFrame(() => {
            o.update("none");
          });
        },
      },
    },
  });
  let a;
  window.addEventListener("resize", function () {
    (clearTimeout(a),
      (a = setTimeout(function () {
        n.resize();
      }, 250)));
  });
}
function initSavingsBreakdownChart() {
  const o = document.getElementById("savingsBreakdownChart");
  if (!o) return;
  if ("undefined" == typeof Chart)
    return void setTimeout(initSavingsBreakdownChart, 100);
  const t = o.getContext("2d"),
    e = window.innerWidth < 768,
    r = window.innerWidth >= 768 && window.innerWidth < 1024,
    i = new Chart(t, {
      type: "bar",
      data: {
        labels: ["1", "2", "3", "4", "5", "6"],
        datasets: [
          {
            label: "Initial contribution",
            data: [1750, 0, 0, 0, 0, 0],
            backgroundColor: "#3B82F6",
            borderColor: "#3B82F6",
            borderWidth: 0,
            borderRadius: 0,
          },
          {
            label: "Savings",
            data: [16e3, 24e3, 29e3, 35500, 42e3, 4e4],
            backgroundColor: "#D1DE6F",
            borderColor: "#D1DE6F",
            borderWidth: 0,
            borderRadius: 0,
          },
          {
            label: "Growth",
            data: [0, 0, 1e3, 2e3, 3e3, 3500],
            backgroundColor: "#9CA3AF",
            borderColor: "#9CA3AF",
            borderWidth: 0,
            borderRadius: 0,
          },
        ],
      },
      options: {
        responsive: !0,
        maintainAspectRatio: !0,
        aspectRatio: e ? 1.2 : r ? 1.5 : 1.8,
        indexAxis: "x",
        scales: {
          x: {
            stacked: !0,
            grid: { display: !1, drawBorder: !1 },
            border: { display: !1 },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)",
              font: { size: e ? 11 : r ? 12 : 13 },
            },
          },
          y: {
            stacked: !0,
            beginAtZero: !0,
            max: 45e3,
            ticks: {
              stepSize: 5e3,
              color: "rgba(255, 255, 255, 0.7)",
              font: { size: e ? 10 : r ? 11 : 12 },
              callback: function (o) {
                return "$" + o.toLocaleString();
              },
            },
            grid: {
              display: !0,
              color: "rgba(255, 255, 255, 0.1)",
              drawBorder: !1,
            },
            border: { display: !1 },
          },
        },
        plugins: {
          title: {
            display: !0,
            text: "Savings breakdown",
            align: "start",
            color: "#FFFFFF",
            font: { size: e ? 16 : r ? 18 : 20, weight: "600" },
            padding: { top: 0, bottom: e ? 10 : 20 },
          },
          legend: {
            display: !0,
            position: "bottom",
            align: "center",
            labels: {
              color: "#FFFFFF",
              padding: e ? 8 : 12,
              font: { size: e ? 11 : r ? 12 : 13 },
              usePointStyle: !0,
              pointStyle: "circle",
              boxWidth: 8,
              boxHeight: 8,
            },
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "rgba(255, 255, 255, 0.1)",
            borderWidth: 1,
            padding: e ? 8 : 12,
            titleFont: { size: e ? 11 : 12 },
            bodyFont: { size: e ? 10 : 11 },
            displayColors: !0,
            callbacks: {
              label: function (o) {
                return o.dataset.label + ": $" + o.parsed.y.toLocaleString();
              },
            },
          },
        },
        interaction: { intersect: !1, mode: "index" },
      },
    });
  let n;
  window.addEventListener("resize", function () {
    (clearTimeout(n),
      (n = setTimeout(function () {
        i.resize();
      }, 250)));
  });
}
(document.addEventListener("DOMContentLoaded", initInvestmentChart),
  document.addEventListener("DOMContentLoaded", initSavingsBreakdownChart));
