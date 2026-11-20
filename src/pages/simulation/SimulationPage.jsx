import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { calculateSimulation, validateSimulationInput, formatRupiah } from '../../engine/calculator.js';
import { formatRibuan, parseAngka } from '../../utils/formatters.js';

const moneyFields = [
  { name: 'targetDana', label: 'Target dana (Rp)' },
  { name: 'danaAwal', label: 'Dana awal (Rp)' },
  { name: 'setoranBulanan', label: 'Setoran bulanan (Rp)' },
];

export function SimulationPage() {
  const { simulationData, updateSimulationData, financialData } = useApp();
  const [formData, setFormData] = useState({
    namaTujuan: simulationData.namaTujuan || 'Dana Laptop',
    targetDana: simulationData.targetDana || '12000000',
    danaAwal: simulationData.danaAwal || financialData.tabungan || financialData.danaDimiliki || '1000000',
    setoranBulanan: simulationData.setoranBulanan || '400000',
    jangkaWaktuBulan: simulationData.jangkaWaktuBulan || '24',
    pertumbuhanTahunan: simulationData.pertumbuhanTahunan || '0',
    inflasiTahunan: simulationData.inflasiTahunan || '0',
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (event, money = false) => {
    const { name, value } = event.target;
    const nextValue = money ? parseAngka(value) : value;
    setFormData({ ...formData, [name]: nextValue });
    updateSimulationData({ [name]: nextValue });
    setErrors({ ...errors, [name]: null });
    setResult(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Form memakai persen, sedangkan kalkulator menerima tingkat dalam desimal.
    const params = {
      ...formData,
      pertumbuhanTahunan: Number(formData.pertumbuhanTahunan) / 100,
      inflasiTahunan: Number(formData.inflasiTahunan) / 100,
    };
    const validation = validateSimulationInput(params);
    const nextErrors = { ...validation.errors };
    for (const name of ['targetDana', 'danaAwal', 'setoranBulanan', 'jangkaWaktuBulan', 'pertumbuhanTahunan', 'inflasiTahunan']) {
      if (formData[name] === '' || !Number.isFinite(Number(formData[name]))) nextErrors[name] = 'Isi dengan angka yang valid.';
    }
    if (Number(formData.jangkaWaktuBulan) > 600) nextErrors.jangkaWaktuBulan = 'Jangka waktu maksimal 600 bulan.';
    for (const name of ['pertumbuhanTahunan', 'inflasiTahunan']) {
      if (Number(formData[name]) <= -100 || Number(formData[name]) > 100) nextErrors[name] = 'Masukkan nilai di atas -100% hingga 100%.';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setResult(null);
      return;
    }
    setResult(calculateSimulation(params));
  };

  return (
    <div className="page-container">
      <h1>Rencana dan Simulasi</h1>
      <p>Masukkan rencana dana, lalu tekan Hitung Simulasi untuk melihat perkiraannya.</p>
      <div className="simulation-layout">
        <form className="simple-card simulation-form" onSubmit={handleSubmit} noValidate>
          <h2>Rencana Dana</h2>
          <div className="form-group-modern">
            <label htmlFor="namaTujuan">Nama tujuan</label>
            <input id="namaTujuan" name="namaTujuan" value={formData.namaTujuan} onChange={handleChange} aria-invalid={!!errors.namaTujuan} />
            {errors.namaTujuan && <p className="field-error-modern" role="alert">{errors.namaTujuan}</p>}
          </div>
          {moneyFields.map((field) => (
            <div className="form-group-modern" key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              <input id={field.name} name={field.name} inputMode="numeric" value={formatRibuan(formData[field.name])} onChange={(event) => handleChange(event, true)} aria-invalid={!!errors[field.name]} />
              {errors[field.name] && <p className="field-error-modern" role="alert">{errors[field.name]}</p>}
            </div>
          ))}
          <div className="form-group-modern">
            <label htmlFor="jangkaWaktuBulan">Jangka waktu (bulan)</label>
            <input type="number" id="jangkaWaktuBulan" name="jangkaWaktuBulan" min="1" max="600" value={formData.jangkaWaktuBulan} onChange={handleChange} aria-invalid={!!errors.jangkaWaktuBulan} />
            {errors.jangkaWaktuBulan && <p className="field-error-modern" role="alert">{errors.jangkaWaktuBulan}</p>}
          </div>
          <details className="assumptions-details">
            <summary>Asumsi pertumbuhan dan inflasi (opsional)</summary>
            <p className="muted-text">Biarkan 0% untuk menghitung tabungan tanpa pertumbuhan dan inflasi.</p>
            {[
              { name: 'pertumbuhanTahunan', label: 'Pertumbuhan per tahun (%)' },
              { name: 'inflasiTahunan', label: 'Inflasi per tahun (%)' },
            ].map((field) => (
              <div className="form-group-modern" key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <input type="number" id={field.name} name={field.name} min="-99.99" max="100" step="any" value={formData[field.name]} onChange={handleChange} aria-invalid={!!errors[field.name]} />
                {errors[field.name] && <p className="field-error-modern" role="alert">{errors[field.name]}</p>}
              </div>
            ))}
          </details>
          {(errors.pertumbuhanTahunan || errors.inflasiTahunan) && <p className="field-error-modern" role="alert">Periksa angka pada bagian asumsi pertumbuhan dan inflasi.</p>}
          <button type="submit" className="btn-primary-lime">Hitung Simulasi</button>
        </form>
        <section className="simple-card simulation-result" aria-live="polite">
          <h2>Hasil Simulasi</h2>
          {result ? (
            <>
              <p><strong>{result.namaTujuan}</strong> · {result.jangkaWaktuBulan} bulan</p>
              <dl className="result-list">
                <div><dt>Total uang disetor</dt><dd>{formatRupiah(result.akumulasiModalAkhir)}</dd></div>
                <div><dt>Hasil pertumbuhan</dt><dd>{formatRupiah(result.totalPertumbuhan)}</dd></div>
                <div><dt>Perkiraan saldo akhir</dt><dd><strong>{formatRupiah(result.saldoNominalAkhir)}</strong></dd></div>
                <div><dt>Nilai setelah inflasi</dt><dd>{formatRupiah(result.dayaBeliAkhir)}</dd></div>
              </dl>
              <p className="simple-note">
                {result.tercapai
                  ? `Target ${formatRupiah(result.targetDana)} tercapai. Pertama kali tercapai pada bulan ke-${result.bulanTercapai}.`
                  : `Target belum tercapai pada akhir periode. Masih kurang ${formatRupiah(result.kekuranganDana)}.`}
                {!result.tercapai && result.bulanTercapai !== null && ` Target sempat tercapai pada bulan ke-${result.bulanTercapai}, lalu saldo turun kembali.`}
              </p>
              <details>
                <summary>Lihat rincian bulanan</summary>
                <div className="table-responsive">
                  <table>
                    <thead><tr><th>Bulan</th><th>Total Setoran</th><th>Saldo</th><th>Setelah Inflasi</th></tr></thead>
                    <tbody>{result.monthlyData.map((row) => <tr key={row.bulan}><td>{row.bulan}</td><td>{formatRupiah(row.akumulasiModal)}</td><td>{formatRupiah(row.saldoNominal)}</td><td>{formatRupiah(row.dayaBeli)}</td></tr>)}</tbody>
                  </table>
                </div>
              </details>
            </>
          ) : <p className="muted-text">Hasil akan muncul setelah kamu menekan Hitung Simulasi.</p>}
        </section>
      </div>
      <p className="simple-note">Setoran dihitung pada akhir bulan. Hasil ini hanya perkiraan untuk belajar; pertumbuhan sebenarnya dapat naik atau turun.</p>
    </div>
  );
}

export default SimulationPage;
