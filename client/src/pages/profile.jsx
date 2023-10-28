import { Formraw } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { useNavigation, Form } from "react-router-dom";
import { toast } from "react-toastify";
import fetch from "../utils/custom-axios";


export const profileAction = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get('avatar');
  if (file && file.size > 500000) {
    toast.error('Image size too large');
    return null;
  }
  try {
    await fetch('/user/update-user',"patch",formData);
    toast.success('Profile updated successfully');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return null;
};



const Profile = () =>
{
  const { user } = useOutletContext();
  const { name, lastName, email, location } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">Profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label className="form-label" htmlFor="avatar">
              Select an image file (max 0.5 MB):
            </label>
            <input
              className="form-input"
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
            ></input>
          </div>
          <Formraw type="string" name="name" defaultValue={name} />
          <Formraw type="string" name="lastName" defaultValue={lastName} />
          <Formraw type="email" name="email" defaultValue={email} />
          <Formraw type="string" name="location" defaultValue={location} />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting" : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
