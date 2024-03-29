import ItemBox from "../elements/ItemBox";
import NotFound from "../elements/NotFound";

async function Students() {
  const url = process.env.BASE_URL;
  const res = await fetch(`${url}/account/users/`, {
    next: { revalidate: 5 },
  });
  const data = await res.json();
  const students = data.filter((item) => item.role === "user");

  return (
    <div>
      {students.length ? (
        students.map((item, index) => (
          <ItemBox key={index} index={index} item={item} type="students" />
        ))
      ) : (
        <NotFound text="دانشجویی ثبت نام نکرده است" />
      )}
    </div>
  );
}

export default Students;
