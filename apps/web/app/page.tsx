import { cn } from "@repo/ui/shared";
import { Button } from "@repo/ui/Button";
import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";

export default function Home() {
  return (
    <PageLayout>
      <h1 className={cn("text-2xl")}>삶의 동기 알아보기</h1>
      <div className={cn("my-12 text-center")}>
        <span>
          이 검사는 당신의 “성격”이 아니라 당신을 움직이는 연료의 종류를
          묻습니다.
          <br />
          <br />
          동기 유형을 알면,
          <br />
          어떤 일을 할 때 가장 몰입하는지,
          <br />
          언제 지치고 의미를 잃는지,
          <br />
          <br />
          삶의 방향을 어디로 조정해야 덜 소모되는지를
          <br />
          명확히 이해할 수 있습니다.
          <br />
          <br />
          결과는 단순한 라벨이 아니라,
          <br />
          당신이 삶의 늪에 빠질 때 스스로를 다시 끌어올릴 수 있는 힌트를
          제공합니다.
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <Link href={"/analysis"}>
          <Button>검사 시작하기</Button>
        </Link>
        {/* 결과 기반으로 유추 */}
        {/*<Link href={"/analysis"}>*/}
        {/*  <Button>또는 유추 하기</Button>*/}
        {/*</Link>*/}
      </div>
    </PageLayout>
  );
}
