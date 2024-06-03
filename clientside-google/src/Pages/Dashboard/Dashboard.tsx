import { Typography } from "antd";

const { Title } = Typography;

export default function Dashboard() {
  return (
    <div>
      <Title style={{ fontSize: "1.5em" }} level={3}>
        Dashboard{" "}
      </Title>
    </div>
  );
}
