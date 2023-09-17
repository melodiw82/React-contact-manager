const SearchContact = () => {
  return (
    <>
      <div className="input-group mx-2 w-75" dir="ltr">
        <span
          className="input-group-text"
          id="basic-addon1"
          style={{ backgroundColor: "pink" }}
        >
          <i className="fa fa-search" />
        </span>
        <input
          type="text"
          dir="rtl"
          style={{ backgroundColor: "gray", borderColor: "pink" }}
          className="form-control"
          placeholder="جستجو مخاطب"
          aria-label="Search"
          aria-describedby="basic-addon1"
        />
      </div>
    </>
  );
};

export default SearchContact;
