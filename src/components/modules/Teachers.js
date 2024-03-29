import ItemBox from "../elements/ItemBox";
import NotFound from "../elements/NotFound";

async function Teachers() {
  const url = process.env.BASE_URL;
  const res = await fetch(`${url}/account/users/`, {
    next: { revalidate: 5 },
  });
  const data = await res.json();
  const teachers = data.filter((item) => item.role === "teacher");

  return (
    <div>
      {teachers.length ? (
        teachers.map((item, index) => (
          <ItemBox key={index} index={index} item={item} type="teachers" />
        ))
      ) : (
        <NotFound text="مدرسی ثبت نام نکرده است" />
      )}
    </div>
  );
}

export default Teachers;
