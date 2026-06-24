import { ProductCard } from "@/components/builder/product-card";
import { ReviewPanel } from "@/components/builder/review-panel";
import { StepSection } from "@/components/builder/step-section";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cameras } from "@/data/cameras";
import { plans } from "@/data/plans";
import { protection } from "@/data/protection";
import { sensors } from "@/data/sensors";
import { formatMonthly } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useBuilderStore } from "@/store/builder.store";
import { useCategoryCount } from "@/store/selectors";
import type { BuilderStep } from "@/types/builder";
import { Camera, Grid2x2Plus, Radar, Shield } from "lucide-react";
import { useState } from "react";

const stepOrder: BuilderStep[] = ["cameras", "plan", "sensors", "protection"];

const stepLabels: Record<BuilderStep, string> = {
  cameras: "Choose your plan",
  plan: "Choose your sensors",
  sensors: "Add extra protection",
  protection: "",
};

export function HomePage() {
  const [openStep, setOpenStep] = useState<string[]>(["cameras"]);
  const cameraCount = useCategoryCount("cameras");
  const sensorCount = useCategoryCount("sensors");
  const accessoryCount =
    useCategoryCount("accessories") + useCategoryCount("protection");
  const selectedPlanId = useBuilderStore((state) => state.selectedPlanId);
  const setPlan = useBuilderStore((state) => state.setPlan);

  const currentStep = (openStep[0] ?? "cameras") as BuilderStep;
  const nextStep = stepOrder[stepOrder.indexOf(currentStep) + 1];
  const nextLabel = nextStep ? stepLabels[currentStep] : undefined;

  const goToNext = () => {
    if (nextStep) {
      setOpenStep([nextStep]);
    }
  };

  const buttonClasses = cn(
    "h-11 rounded-lg border border-mckenzie px-8 text-lg font-semibold text-mckenzie transition-all hover:bg-mckenzie hover:text-white"
  );

  return (
    <div>
      <div className="mx-auto max-w-[1440px] py-8 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px] xl:gap-8">
          <div className="overflow-hidden bg-card">
            {/* Mobile Title */}
            <h1 className="pb-5 text-center text-[32px] font-bold text-retro-black sm:hidden">
              Let’s get started!
            </h1>
            <Accordion
              value={openStep}
              onValueChange={(value) =>
                setOpenStep(Array.isArray(value) ? value : [value])
              }
              className="bg-white"
            >
              <StepSection
                value="cameras"
                step={1}
                title="Choose your cameras"
                icon={Camera}
                selectedCount={cameraCount}
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {cameras.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      className={cn(
                        index === cameras.length - 1 && cameras.length % 2 === 1
                          ? "md:col-span-2 md:w-full md:max-w-md md:justify-self-center"
                          : undefined
                      )}
                    />
                  ))}
                </div>
                {nextLabel && (
                  <div className="mt-6 flex justify-center">
                    <Button
                      variant="outline"
                      className={buttonClasses}
                      onClick={goToNext}
                    >
                      Next: {nextLabel}
                    </Button>
                  </div>
                )}
              </StepSection>

              <StepSection
                value="plan"
                step={2}
                title="Choose your plan"
                icon={Shield}
                selectedCount={selectedPlanId !== "no-plan" ? 1 : 0}
              >
                <div className="grid grid-cols-1 gap-3">
                  {plans.map((plan) => (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setPlan(plan.id)}
                      className={cn(
                        "flex items-center justify-between rounded-xl border-2 bg-background p-4 text-left transition-all",
                        selectedPlanId === plan.id
                          ? "border-wyze-purple ring-1 ring-wyze-purple/20"
                          : "border-transparent ring-1 ring-foreground/10 hover:ring-foreground/20"
                      )}
                    >
                      <div>
                        <p className="font-semibold text-foreground">
                          {plan.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {plan.description}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-foreground">
                        {plan.price > 0 ? formatMonthly(plan.price) : "Free"}
                      </p>
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex justify-center">
                  <Button
                    variant="outline"
                    className={buttonClasses}
                    onClick={() => setOpenStep(["sensors"])}
                  >
                    Next: Choose your sensors
                  </Button>
                </div>
              </StepSection>

              <StepSection
                value="sensors"
                step={3}
                title="Choose your sensors"
                icon={Radar}
                selectedCount={sensorCount}
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {sensors.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <div className="mt-6 flex justify-center">
                  <Button
                    variant="outline"
                    className={buttonClasses}
                    onClick={() => setOpenStep(["protection"])}
                  >
                    Next: Add extra protection
                  </Button>
                </div>
              </StepSection>

              <StepSection
                value="protection"
                step={4}
                title="Add extra protection"
                icon={Grid2x2Plus}
                selectedCount={accessoryCount}
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {protection.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </StepSection>
            </Accordion>
          </div>

          <ReviewPanel />
        </div>
      </div>
    </div>
  );
}
