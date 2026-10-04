import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/constants";

export function CompanyFlow() {
  return (
    <div className="integrated-flow">
      {SITE.company.integratedFlow.map((item, index) => (
        <Fragment key={item}>
          <span>{item}</span>
          {index < SITE.company.integratedFlow.length - 1 && (
            <ArrowRight size={12} className="text-olive" />
          )}
        </Fragment>
      ))}
    </div>
  );
}
