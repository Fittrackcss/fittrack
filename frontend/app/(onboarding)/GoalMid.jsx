import MidScreenSwitch from "../../components/ui/MidScreenSwitch";
const GoalMid = () => {
  const item = "GoalReason";
  const title = "Goals";
  const header = `Great! You've just taken a big step on your journey`;

  const description = `Did you know that tracking your food is a scientifically proven method to being successful? It's called "self-monitoring"  ${"\n"}and the more consistent you are,${"\n"} the more likely you are to hit your goals`;

  const sub = "Now, let's talk about your goal to gain";
  return (
    <MidScreenSwitch
      item={item}
      title={title}
      header={header}
      description={description}
      sub={sub}
    />
  );
};

export default GoalMid;
