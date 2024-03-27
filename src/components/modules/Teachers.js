async function Teachers() {
  const url = process.env.BASE_URL;
  const res = await fetch(`${url}/account/users/`, {
    next: { revalidate: 5 },
  });
  const data = res.json();
  const teachers = data.filter((item) => item.role === "teacher");
  return <div>Teachers Page</div>;
}

export default Teachers;
