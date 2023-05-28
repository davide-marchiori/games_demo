import { useState } from "react";
import { ExampleGameRenderer } from "../components";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export { Instructions };

function Instructions() {
  return (
    <div className="min-h-full">
      <main className="lg:relative">
        <div className="relative overflow-hidden bg-white py-8">
          <div className="hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full lg:[overflow-anchor:none]">
            <div
              className="relative mx-auto h-full max-w-prose text-lg"
              aria-hidden="true"
            >
              <svg
                className="absolute top-12 left-full translate-x-32 transform"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
              >
                <defs>
                  <pattern
                    id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
                />
              </svg>
              <svg
                className="absolute top-1/2 right-full -translate-y-1/2 -translate-x-32 transform"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
              >
                <defs>
                  <pattern
                    id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
                />
              </svg>
              <svg
                className="absolute bottom-12 left-full translate-x-32 transform"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
              >
                <defs>
                  <pattern
                    id="d3eb07ae-5182-43e6-857d-35c643af9034"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
                />
              </svg>
            </div>
          </div>
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-prose text-lg">
              <h1>
                <span className="block text-center text-lg font-semibold text-indigo-600">
                  Instructions
                </span>
                <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                  Training session
                </span>
              </h1>
              <p className="mt-8 text-xl leading-8 text-gray-500">
                In this training session, you will face a sequence of{" "}
                <b>interactive decisions</b> in which you will have to choose
                among three possible actions. <i>Interactive</i> means that the
                payoff from your decisions (expressed in points) depends on both
                your choice and that of a counterpart.
              </p>
              <p className="mt-8 text-xl leading-8 text-gray-500">
                In this training session, your counterpart will be the
                "Computer", that is, an algorithm that uses a pre-determined
                decision rule. You and the Computer will choose simultaneously,
                meaning that both of you will not know in advance the choice of
                the other.
              </p>
            </div>
            <div className="prose prose-lg prose-indigo mx-auto mt-12 stext-gray-500">
              <h2>Your goal</h2>
              <p className="mt-8 text-xl leading-8 text-gray-500">
                Your goal in these training sessions is that of maximizing your
                wins, which does not necessarily imply outperforming the
                Computer.
              </p>
              <p className="mt-8 text-xl leading-8 text-gray-500">
                The Computer uses a decision rule that maximizes its own payoff,
                provided that you will also try to maximize your own. In
                addition, the Computer will not change its decision rule
                throughout the training session, nor will adapt it to your
                previous decisions.
              </p>
              <h2>Your and the Computer's actions</h2>
              <p className="mt-8 text-xl leading-8 text-gray-500">
                Each interactive decision, henceforth referred to as a{" "}
                <b>game</b>, is represented as a table, as shown in the example
                below.
              </p>
              <div className="mt-8 text-xl leading-8 text-gray-500">
                <ExampleGameRenderer />
              </div>
              <p className="mt-8 text-xl leading-8 text-gray-500">
                In all the games presented in these training sessions, you and
                the Computer can select among three possible actions; yours are
                labeled "Action 1", "Action 2", and "Action 3", whereas those of
                the Computer "C1", "C2", and "C3". Your actions are displayed by
                row, and those of the Computer by column. Each combination of
                actions by you and the Computer indicates one cell of the game
                table, and each cell includes a pair of numbers: the first
                number (highlighted in green) is your payoff, and the second (in
                gray) that of the Computer.
              </p>
              <p className="mt-8 text-xl leading-8 text-gray-500">
                You can select one of your actions by clicking on one of the
                action buttons. You will not be allowed to get back to previous
                games to revise your previous actions.
              </p>
              <p className="mt-8 text-xl leading-8 text-gray-500">
                <i>Example:</i> Referring to the game illustrated above, if you
                choose Action 1 and the Computer chooses C3, you will get 58
                points (number in green) and the Computer 44 points.
              </p>
              <h2>Structure of the session</h2>
              <p className="mt-8 text-xl leading-8 text-gray-500">
                This training session includes <b>three parts</b>. In part 1 and
                3, after you have made your choice, you will not receive any
                feedback about the outcome of the game and the choice of the
                Computer. Thus, you will act solely based on your own analysis
                of the game and your beliefs about the Computer's decision rule.
              </p>
              <p className="mt-8 text-xl leading-8 text-gray-500">
                In part 2, after each decision, you will be shown the choice of
                the Computer as well as the outcome of the game. This will give
                you the opportunity to infer the decision rule used by the
                Computer and improve your decision-making.
              </p>
              <h2>Express your beliefs on the Computer's actions</h2>
              <p className="mt-8 text-xl leading-8 text-gray-500">
                Beside having to selecting one of your actions, you are also
                asked to express your beliefs on how likely is the Computer to
                choose each of its actions.
              </p>
              <p className="mt-8 text-xl leading-8 text-gray-500">
                In order to do this, you will have to rate the likelihood with
                which the Computer is going to chose each of its actions by
                filling in the fields that are at the bottom of the game table.
                In correspondence to each action, you can indicate numbers
                between 0 and 100, where 0 means that you are sure that the
                Computer will not choose that action, and 100 that you are sure
                the Computer will choose it. Remember that the numbers in the
                three fields have to sum up to 100.
              </p>
              <p className="mt-8 text-xl leading-8 text-gray-500">
                <i>Example:</i> If you wrote "10", "70", and "20" in the
                likelihood fields as illustrated in the example above, it means
                that you are not certain about which action the Computer is
                going to choose, but also that in your opinion the computer will
                most probably choose C2, and that it is more likely to choose C3
                than C1. If you were sure that the Computer would play, say, C2,
                then you should enter the numbers "0", "100", and "0" in the
                fields.
              </p>
              <h2>Important points to remember</h2>
              <ul className="mt-8 text-xl leading-8 text-gray-500">
                <li>
                  Your task in all training sessions is that of gaining as much
                  points as possible, and thus not necessarily that of beating
                  the Computer.
                </li>
                <li>
                  The Computer makes its choices with the goal of gaining as
                  many points as possible under the assumption that you do the
                  same, and does not change its decision rule.
                </li>
                <li>
                  In each game, you choose one row of the game table, whereas
                  the Computer chooses one of its columns: it is only the
                  combination of the row and column choices that determines your
                  and the Computer's payoff.
                </li>
                <li>
                  Neither you nor the Computer will know in advance the choice
                  of the other.
                </li>
                <li>
                  You are also asked to rate the likelihood of each of the
                  Computer's choices indicating a number between 0 (not likely
                  at all) and 100 (practically certain). The likelihood points
                  that you indicate for the three choices have to sum up to 100.
                </li>
                <li>
                  In part 1 and 3 of this study, you will make your choices
                  without being informed about the Computer's choice. Instead,
                  in part 2, after each of your decisions, you will receive
                  feedback about the Computer's choice and the outcome of the
                  game.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
