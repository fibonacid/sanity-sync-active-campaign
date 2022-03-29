export default function Home() {
  return (
    <div>
      <h1>Job application</h1>
      <form action="/api/apply" method="post" encType="multipart/form-data">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input name="email" id="email" type="email" required></input>
        </div>
        <div className="field">
          <label htmlFor="firstName">First name</label>
          <input name="firstName" id="firstName" required></input>
        </div>
        <div className="field">
          <label htmlFor="lastName">Last name</label>
          <input name="lastName" id="lastName" required></input>
        </div>
        <div className="field">
          <label htmlFor="files">Documents (PDF)</label>
          <input name="files" id="files" type="file" multiple required></input>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
