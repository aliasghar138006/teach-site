async function Students() {
  const url = process.env.BASE_URL;
  const res = await fetch(`${url}/account/users/`, {
    next: { revalidate: 5 },
  });
  const data = res.json();
  const studens = data.filter((item) => item.role === "user");
  return <div>Students Page</div>;
}

export default Students;
