module Styles where

import Color exposing (Color, rgba)
import Css exposing (Styles)
import Css.Margin as Margin
import Css.Font exposing (size)
import Css.Font as Font
import Css.Dimension as Dim
import Css.Border as Border
import Css.Background as Bg


headingStyles : Styles -> Styles
headingStyles styles =
    styles
        |> Font.family "Georgia, Serif"
        |> size 36


mainDivStyles : Styles -> Styles
mainDivStyles styles =
    styles
        |> Margin.all 0 10 0 10
        |> Dim.width 300



