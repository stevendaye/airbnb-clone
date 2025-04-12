"use client";

import { Button } from "@/components/common/button";
import { Container } from "@/components/common/container";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ErrorProps {
  error: Error;
}

const ErrorPage: React.FC<ErrorProps> = () => {
  const router = useRouter();

  return (
    <Container>
      <div className="mt-28 max-w-screen-lg mx-auto h-auto">
        <div className="flex items-center justify-center">
          <div className="flex flex-col-reverse md:flex-row items-center gap-y-5 md:gap-x-10">
            <div className="max-w-96 text-center md:text-start">
              <h1 className="text-8xl md:text-9xl font-bold text-gray-600">
                Shoot!
              </h1>

              <p className="font-bold text-base text-gray-500 mt-10">
                Error code: 500
              </p>
              <p className="text-lg md:text-xl mt-2 text-gray-500">
                Well, this is unexpected...
              </p>
              <p className="text-lg md:text-xl mt-5 text-gray-500">
                Quick fix, try reloading the page. If it does not work still,
                stay tuned. We're getting back soon
              </p>

              <div className="w-full px-12 md:w-auto md:px-0 mt-5">
                <Button
                  label="Reload the page"
                  onClick={() => router.refresh()}
                />
              </div>
            </div>

            <Image
              src="/404.gif"
              alt="Not Found Gif"
              width={300}
              height={300}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ErrorPage;
