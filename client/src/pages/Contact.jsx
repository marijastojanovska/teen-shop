export default function Contact(){
  return (
    <div className="page" style={{maxWidth:720}}>
      <h2>Контакт</h2>
      <div className="wrap" style={{flexDirection:'column', gap:12}}>
        <label>Име</label>
        <input placeholder="Вашето име" />
        <label>Е-маил</label>
        <input placeholder="email@example.com" />
        <label>Порака</label>
        <textarea rows="5" placeholder="Како можеме да помогнеме?" style={{width:'100%', padding:12, borderRadius:10, border:'1px solid #222', background:'#0f0f10', color:'var(--text)'}}/>
        <button className="btn">Испрати</button>
      </div>
    </div>
  )
}
